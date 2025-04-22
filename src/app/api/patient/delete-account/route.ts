import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user ID from the token
    // Note: You should implement proper token verification and user ID extraction
    const userId = token.value; // Replace this with actual token verification

    // Delete all related records first (due to foreign key constraints)
    await prisma.$transaction([
      // Delete appointments
      prisma.appointment.deleteMany({
        where: { patientId: userId },
      }),
      
      // Delete medical records
      prisma.medicalRecord.deleteMany({
        where: { patientId: userId },
      }),
      
      // Delete prescriptions
      prisma.prescription.deleteMany({
        where: { patientId: userId },
      }),
      
      // Delete messages
      prisma.message.deleteMany({
        where: { 
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        },
      }),
      
      // Finally, delete the patient account
      prisma.patient.delete({
        where: { id: userId },
      }),
      
      // Delete the user account
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    // Clear the authentication cookie
    cookieStore.delete('token');

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
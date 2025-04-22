import SideNavigation from "./sidenavigation";

interface PageContainerProps {
    title: string;
    children: React.ReactNode;
}

export default function PageContainer({ title, children }: PageContainerProps) {
    return (
        <div className="relative">
            {/* Main Content */}
            <div className="space-y-6">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Welcome to your health dashboard
                    </p>
                </header>
                
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
  
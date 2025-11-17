import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Calendar, CreditCard, Settings, BarChart3 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function QuickActions() {
    const routerNavigate = useNavigate();

    const navigate = (action) => {
        switch (action) {
            case "new-project":
                routerNavigate("/client-dashboard/create-gig");
                break;
            case "generate-report":
                routerNavigate("/client-dashboard/generate-report");
                break;
            case "schedule-meeting":
                routerNavigate("/client-dashboard/meetings");
                break;
            case "view-invoices":
                routerNavigate("/client-dashboard/client/invoices");
                break;
            case "team-chat":
                routerNavigate("/client-dashboard/chat");
                break;
            case "settings":
                routerNavigate("/client-dashboard/settings");
                break;
            default:
                break;
        }
    };

    const actions = [
        {
            key: "new-project",
            title: "New Project",
            description: "Start a new project",
            icon: <Plus className="h-5 w-5" />,
            color: "bg-blue-500 hover:bg-blue-600",
        },
        {
            key: "generate-report",
            title: "Generate Report",
            description: "Create analytics report",
            icon: <BarChart3 className="h-5 w-5" />,
            color: "bg-green-500 hover:bg-green-600",
        },
        {
            key: "schedule-meeting",
            title: "Schedule Meeting",
            description: "Book a consultation",
            icon: <Calendar className="h-5 w-5" />,
            color: "bg-purple-500 hover:bg-purple-600",
        },
        {
            key: "view-invoices",
            title: "View Invoices",
            description: "Manage billing",
            icon: <CreditCard className="h-5 w-5" />,
            color: "bg-orange-500 hover:bg-orange-600",
        },
        {
            key: "team-chat",
            title: "Team Chat",
            description: "Message your team",
            icon: <MessageSquare className="h-5 w-5" />,
            color: "bg-pink-500 hover:bg-pink-600",
        },
        {
            key: "settings",
            title: "Settings",
            description: "Account preferences",
            icon: <Settings className="h-5 w-5" />,
            color: "bg-gray-500 hover:bg-gray-600",
        },
    ];

    return (
        <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used actions and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            onClick={() => navigate(action.key)}
                            variant="outline"
                            className={`h-auto p-4 flex flex-col items-center gap-2 text-white border-0 ${action.color} transition-all duration-200 hover:scale-105`}
                        >
                            {action.icon}
                            <div className="text-center">
                                <div className="font-semibold text-sm">{action.title}</div>
                                <div className="text-xs opacity-90">{action.description}</div>
                            </div>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

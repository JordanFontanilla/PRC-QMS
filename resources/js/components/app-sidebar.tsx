import * as React from "react";
import {
    AudioWaveform,
    Bot,
    Command,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

const initialData = {
    user: {
        name: "JOHN CARLO BOLEYLEy",
        email: "ADMIN (21100780)",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Administrator",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                { title: "Dashboard", url: "/admin/dashboard" },
                { title: "Counters", url: "/admin/counters" },
                { title: "Departments", url: "/admin/departments" },
                { title: "Processes", url: "/admin/processes" },
                { title: "Users", url: "/admin/userManagement" },
            ],
        },
        {
            title: "Receptionist",
            url: "#",
            icon: Bot,
            isActive: false,
            items: [
                {
                    title: "Service Assignments",
                    url: "/receptionist/serviceAssignments",
                    target: "_blank",
                },
                { title: "Queues", url: "/receptionist/queueTickets" },
                {
                    title: "Queue Command Center",
                    url: "/receptionist/queueCommandCenter",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            isActive: false,
            items: [
                { title: "General", url: "#" },
                { title: "Team", url: "#" },
                { title: "Billing", url: "#" },
                { title: "Limits", url: "#" },
            ],
        },
    ],
    projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();
    const [navData, setNavData] = React.useState(initialData);
    const { auth } = usePage<any>().props;

    // Update active states based on current URL
    React.useEffect(() => {
        setNavData((prevData) => ({
            ...prevData,
            navMain: prevData.navMain.map((section) => ({
                ...section,
                isActive: section.items.some((item) =>
                    url.startsWith(item.url)
                ),
            })),
        }));
    }, [url]);

    const handleItemClick = (clickedTitle: string) => {
        setNavData((prevData) => ({
            ...prevData,
            navMain: prevData.navMain.map((item) => ({
                ...item,
                isActive: item.title === clickedTitle,
            })),
        }));
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={navData.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain
                    items={navData.navMain}
                    onItemClick={handleItemClick}
                    activePath={url}
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={navData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavMainProps {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
            target?: string;
        }[];
    }[];
    onItemClick?: (title: string) => void;
    activePath: string; // Add activePath prop
}

export function NavMain({ items, onItemClick, activePath }: NavMainProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    // Determine if any sub-item is active
                    const hasActiveSubItem =
                        item.items?.some((subItem) =>
                            activePath.startsWith(subItem.url)
                        ) || false;

                    // Combine manual isActive with URL-based active state
                    const isActive = item.isActive || hasActiveSubItem;

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isActive}
                            open={isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        onClick={() =>
                                            onItemClick?.(item.title)
                                        }
                                        className={cn(
                                            "transition-colors",
                                            isActive &&
                                                "bg-accent text-accent-foreground",
                                            !isActive && "hover:bg-accent/50"
                                        )}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        {item.items &&
                                            item.items.length > 0 && (
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            )}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                {item.items && item.items.length > 0 && (
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items.map((subItem) => {
                                                const isSubItemActive =
                                                    activePath.startsWith(
                                                        subItem.url
                                                    );
                                                return (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            className={cn(
                                                                isSubItemActive &&
                                                                    "bg-accent/20 text-accent-foreground"
                                                            )}
                                                        >
                                                            <Link
                                                                href={
                                                                    subItem.url
                                                                }
                                                                target={
                                                                    subItem.target
                                                                }
                                                                className="w-full"
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                                {isSubItemActive && (
                                                                    <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                                                                )}
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                )}
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

import { StarIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
// import { DashboardUserButton } from "./dashboard-user-button";
import { useLocation } from "react-router-dom";
import { DashboardUserButton } from "./DashboardUserButton";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { otherUsers } = useAppSelector((state) => state.user);

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link to="/" className="flex items-center gap-2 px-2 pt-2">
          <img src="/logo.svg" height={36} width={36} alt="Logo" />
          <p className="text-xl font-semibold">Meet&Summary.AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-4">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherUsers?.map((item) => (
                <SidebarMenuItem className="py-[2px]" key={item._id}>
                  <SidebarMenuButton
                    asChild
                    className="h-14 cursor-pointer bg-muted hover:bg-white"
                  >
                    <div>
                      {item?.profilePic !== "" ? (
                        <Avatar>
                          <AvatarImage src={item.profilePic} />
                        </Avatar>
                      ) : (
                        <GeneratedAvatar
                          seed={item.fullName}
                          variant="initials"
                          className="size-9 mr-2"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight">
                          {item.fullName}
                        </span>
                        <span className="text-sm font-sm font- tracking-tight">
                          {item.userName}
                        </span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-4">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-sidebar/50 to-sidebar/50",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5D6B68]/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link to={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

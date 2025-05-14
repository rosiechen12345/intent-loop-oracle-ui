
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, HelpCircle, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b bg-white dark:bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4 mr-auto">
          <div className="h-8 w-8 md:h-10 md:w-10">
            <div className="hidden sm:flex h-full w-full items-center justify-center rounded-md bg-epsilon-blue text-white font-bold text-lg">
              E
            </div>
          </div>
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold tracking-tight text-epsilon-blue">
              Epsilon Intent Loop Simulator
            </h2>
            <p className="text-xs text-muted-foreground">
              Create, analyze, and optimize your marketing campaigns
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="Maya Patel" />
                  <AvatarFallback className="bg-epsilon-purple text-white">MP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Maya Patel</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    m.patel@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

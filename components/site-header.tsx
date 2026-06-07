"use client"

import { AlfuLogo } from "@/components/alfu-logo"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { displayPhone } from "@/lib/phone"
import { LogOut, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export function SiteHeader() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <AlfuLogo />

        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="secondary"
                size="sm"
                className="gap-2"
                aria-label="Akaunti yangu"
              />
            }
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase() || <User className="size-3" />}
            </span>
            <span className="hidden max-w-28 truncate sm:inline">
              {user?.name || "Akaunti"}
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Akaunti yangu</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {user?.phone ? displayPhone(user.phone) : ""}
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Akaunti yako inaruhusu kifaa kimoja kwa wakati mmoja. Ukiingia
                kwenye kifaa kingine, kifaa hiki kitatolewa moja kwa moja.
              </p>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Funga
              </DialogClose>
              <Button variant="destructive" onClick={signOut} className="gap-2">
                <LogOut className="size-4" />
                Toka
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

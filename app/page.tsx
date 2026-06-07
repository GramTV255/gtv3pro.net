"use client"

import { useAuth } from "@/lib/auth-context"
import { AuthScreen } from "@/components/auth-screen"
import { BrowsePage } from "@/components/browse-page"
import { AlfuLogo } from "@/components/alfu-logo"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Loader2, MonitorSmartphone } from "lucide-react"

export default function Page() {
  const { user, loading, kickedOut, clearKickedOut } = useAuth()

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <AlfuLogo className="scale-125" />
        <Loader2 className="size-6 animate-spin text-primary" />
      </main>
    )
  }

  return (
    <>
      {user ? <BrowsePage /> : <AuthScreen />}

      {/* Onyo la kutolewa kwa sababu ya kifaa kingine */}
      <Dialog open={kickedOut} onOpenChange={(o) => !o && clearKickedOut()}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/15">
              <MonitorSmartphone className="size-6 text-primary" />
            </div>
            <DialogTitle>Umetolewa kwenye kifaa hiki</DialogTitle>
            <DialogDescription className="text-pretty leading-relaxed">
              Akaunti yako imeingia kwenye kifaa kingine. Alfu TV inaruhusu kifaa
              kimoja tu kwa wakati mmoja. Ingia tena kuendelea kutazama hapa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={clearKickedOut} className="w-full">
              Sawa, nimeelewa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

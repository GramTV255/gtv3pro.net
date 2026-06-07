"use client"

import { AlfuLogo } from "@/components/alfu-logo"
import { AuthForm } from "@/components/auth-form"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { AlertTriangle, Tv, Radio, Smartphone } from "lucide-react"

export function AuthScreen() {
  const { configured } = useAuth()

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/auth-backdrop.png)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="relative z-10 grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        {/* Upande wa maelezo */}
        <div className="hidden flex-col gap-6 lg:flex">
          <AlfuLogo className="scale-110 self-start" />
          <h1 className="text-balance text-4xl font-bold leading-tight">
            Burudani isiyo na mwisho, popote ulipo.
          </h1>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Tazama TV shows, filamu na chaneli za moja kwa moja kwa ubora wa hali
            ya juu. Jisajili kwa namba yako ya simu na anza kufurahia mara moja.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Tv className="size-5" />
              </span>
              <span className="text-sm">Maelfu ya vipindi na filamu</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Radio className="size-5" />
              </span>
              <span className="text-sm">Chaneli za moja kwa moja (Live)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Smartphone className="size-5" />
              </span>
              <span className="text-sm">Tazama kwenye kifaa chako popote</span>
            </li>
          </ul>
        </div>

        {/* Fomu */}
        <Card className="w-full border-border/60 bg-card/80 p-6 backdrop-blur-md sm:p-8">
          <div className="mb-6 flex flex-col items-center gap-2 lg:hidden">
            <AlfuLogo className="scale-110" />
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Karibu Alfu TV</h2>
            <p className="text-sm text-muted-foreground">
              Ingia au jisajili kuendelea
            </p>
          </div>

          {!configured && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Firebase haijaunganishwa bado. Ongeza environment variables za
                Firebase ili kuwezesha kujisajili na kuingia.
              </p>
            </div>
          )}

          <AuthForm />

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            Kwa kuendelea, unakubaliana na masharti ya matumizi ya Alfu TV.
            Akaunti moja inaruhusu kifaa kimoja kwa wakati mmoja.
          </p>
        </Card>
      </div>
    </main>
  )
}

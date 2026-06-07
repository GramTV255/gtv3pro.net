"use client"

import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { isValidPhone } from "@/lib/phone"
import { Loader2, Phone, Lock, User } from "lucide-react"
import { toast } from "sonner"

export function AuthForm() {
  const { signIn, signUp } = useAuth()
  const [tab, setTab] = useState("login")
  const [loading, setLoading] = useState(false)

  // login state
  const [loginPhone, setLoginPhone] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // signup state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  function mapError(err: unknown): string {
    const code = (err as { code?: string })?.code ?? ""
    switch (code) {
      case "auth/email-already-in-use":
        return "Namba hii ya simu tayari imesajiliwa. Tafadhali ingia."
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Namba ya simu au nenosiri si sahihi."
      case "auth/weak-password":
        return "Nenosiri liwe na herufi 6 au zaidi."
      case "auth/network-request-failed":
        return "Tatizo la mtandao. Tafadhali jaribu tena."
      default:
        return "Hitilafu imetokea. Tafadhali jaribu tena."
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidPhone(loginPhone)) {
      toast.error("Tafadhali ingiza namba sahihi ya simu.")
      return
    }
    if (loginPassword.length < 6) {
      toast.error("Nenosiri liwe na herufi 6 au zaidi.")
      return
    }
    setLoading(true)
    try {
      await signIn(loginPhone, loginPassword)
      toast.success("Karibu tena!")
    } catch (err) {
      toast.error(mapError(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2) {
      toast.error("Tafadhali ingiza jina lako.")
      return
    }
    if (!isValidPhone(phone)) {
      toast.error("Tafadhali ingiza namba sahihi ya simu.")
      return
    }
    if (password.length < 6) {
      toast.error("Nenosiri liwe na herufi 6 au zaidi.")
      return
    }
    setLoading(true)
    try {
      await signUp(phone, name.trim(), password)
      toast.success("Akaunti imetengenezwa. Karibu Alfu TV!")
    } catch (err) {
      toast.error(mapError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Ingia</TabsTrigger>
        <TabsTrigger value="signup">Jisajili</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-6">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-phone">Namba ya simu</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-phone"
                type="tel"
                inputMode="tel"
                placeholder="0712 345 678"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className="pl-9"
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-password">Nenosiri</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-password"
                type="password"
                placeholder="Weka nenosiri lako"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="pl-9"
                autoComplete="current-password"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Ingia"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="signup" className="mt-6">
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-name">Jina lako</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="signup-name"
                type="text"
                placeholder="Mfano: Juma Hassan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9"
                autoComplete="name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-phone">Namba ya simu</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="signup-phone"
                type="tel"
                inputMode="tel"
                placeholder="0712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-9"
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-password">Nenosiri</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="signup-password"
                type="password"
                placeholder="Herufi 6 au zaidi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                autoComplete="new-password"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Tengeneza akaunti"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}

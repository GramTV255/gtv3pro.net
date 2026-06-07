// Visaidizi vya kushughulikia namba za simu (Tanzania kwa default)

// Safisha namba: ondoa nafasi, dashi, na alama nyingine
export function normalizePhone(input: string): string {
  let phone = input.replace(/[\s\-()]/g, "").trim()

  // Badilisha namba za Tanzania kuwa muundo wa kimataifa
  if (phone.startsWith("0")) {
    phone = "255" + phone.slice(1)
  } else if (phone.startsWith("+")) {
    phone = phone.slice(1)
  }

  return phone
}

// Thibitisha namba ya simu ni sahihi (tarakimu 9-15)
export function isValidPhone(phone: string): boolean {
  const normalized = normalizePhone(phone)
  return /^\d{9,15}$/.test(normalized)
}

// Geuza namba ya simu kuwa "email" ya ndani kwa ajili ya Firebase Auth
// Mtumiaji haoni hili - ni kwa matumizi ya ndani tu
export function phoneToEmail(phone: string): string {
  return `${normalizePhone(phone)}@alfutv.app`
}

// Onyesha namba kwa muundo mzuri
export function displayPhone(phone: string): string {
  const n = normalizePhone(phone)
  if (n.startsWith("255") && n.length === 12) {
    return `+${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}`
  }
  return `+${n}`
}

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formationName?: string
}

const FORMATION_OPTIONS = [
  { value: 'F1 Musulman', label: 'F1 Musulman' },
  { value: 'F2 Musulman Pro', label: 'F2 Musulman Pro' },
  { value: 'F3 Tout Public', label: 'F3 Tout Public' },
  { value: 'F4 Pro Tout Public', label: 'F4 Pro Tout Public' },
  { value: 'Pack complet', label: 'Pack complet' },
  { value: 'Autre', label: 'Autre' },
]

export function ContactModal({ open, onOpenChange, formationName }: ContactModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [formation, setFormation] = useState(() => {
    if (formationName) {
      const match = FORMATION_OPTIONS.find(
        (opt) =>
          opt.value.toLowerCase().includes(formationName.toLowerCase()) ||
          formationName.toLowerCase().includes(opt.value.toLowerCase())
      )
      return match ? match.value : formationName
    }
    return ''
  })
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      // Reset form on close
      setName('')
      setEmail('')
      setPhone('')
      setFormation('')
      setMessage('')
      setErrors({})
    }
    onOpenChange(nextOpen)
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formation) {
      newErrors.formation = 'Veuillez sélectionner une formation'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    setIsSubmitting(false)
    toast.success('Demande envoyée avec succès !', {
      description: `Merci ${name.split(' ')[0]}, nous vous répondrons sous 24h.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-lg leading-tight">
                Demander un devis
              </DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Remplissez le formulaire ci-dessous et nous vous répondrons sous 24h.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-4 card-hover-lift p-4 rounded-xl bg-stone-50/50 dark:bg-stone-900/30 border border-stone-200/60 dark:border-stone-800/60">
            {/* Nom complet */}
            <div className="space-y-1.5">
              <Label htmlFor="contact-name" className="text-xs font-medium">
                Nom complet <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="contact-name"
                placeholder="Votre nom complet"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                }}
                className={cn(
                  'h-9 text-sm',
                  errors.name && 'border-rose-400 dark:border-rose-600 focus-visible:ring-rose-400/30'
                )}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="contact-email" className="text-xs font-medium">
                Email <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                }}
                className={cn(
                  'h-9 text-sm',
                  errors.email && 'border-rose-400 dark:border-rose-600 focus-visible:ring-rose-400/30'
                )}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-500">{errors.email}</p>
              )}
            </div>

            {/* Téléphone */}
            <div className="space-y-1.5">
              <Label htmlFor="contact-phone" className="text-xs font-medium">
                Téléphone <span className="text-muted-foreground/60">(optionnel)</span>
              </Label>
              <Input
                id="contact-phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            {/* Formation */}
            <div className="space-y-1.5">
              <Label htmlFor="contact-formation" className="text-xs font-medium">
                Formation intéressée
              </Label>
              <Select value={formation} onValueChange={(val) => {
                setFormation(val)
                if (errors.formation) setErrors((prev) => ({ ...prev, formation: '' }))
              }}>
                <SelectTrigger
                  id="contact-formation"
                  className={cn(
                    'w-full h-9 text-sm',
                    errors.formation && 'border-rose-400 dark:border-rose-600'
                  )}
                >
                  <SelectValue placeholder="Sélectionnez une formation" />
                </SelectTrigger>
                <SelectContent>
                  {FORMATION_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.formation && (
                <p className="text-[11px] text-rose-500">{errors.formation}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label htmlFor="contact-message" className="text-xs font-medium">
                Message
              </Label>
              <Textarea
                id="contact-message"
                placeholder="Décrivez votre projet ou posez vos questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[80px] text-sm resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-4 pricing-cta h-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer la demande
              </>
            )}
          </Button>

          <p className="text-center text-[10px] text-muted-foreground/60 mt-3">
            Sans engagement · Réponse sous 24h · Vos données restent confidentielles
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
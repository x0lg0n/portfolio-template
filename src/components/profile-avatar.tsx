"use client"

import * as React from "react"
import { QrCode, User } from "lucide-react"

import { cn } from "@/lib/utils"

interface ProfileAvatarProps {
  src: string
  gifSrc?: string
  qrSrc?: string
  alt: string
  fallback: string
  className?: string
}

export function ProfileAvatar({
  src,
  gifSrc,
  qrSrc,
  alt,
  fallback,
  className,
}: ProfileAvatarProps) {
  const [hovering, setHovering] = React.useState(false)
  const [showQr, setShowQr] = React.useState(false)
  const [imgError, setImgError] = React.useState(false)

  const displaySrc = showQr ? qrSrc : hovering && gifSrc ? gifSrc : src

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="size-full overflow-hidden rounded-xl border border-border bg-muted shadow-lg ring-4 ring-muted">
        {displaySrc && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displaySrc}
            alt={showQr ? `${alt} QR code` : alt}
            onError={() => setImgError(true)}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-heading text-xl font-bold">
            {fallback}
          </div>
        )}
      </div>
      {qrSrc && (
        <button
          type="button"
          onClick={() => setShowQr((value) => !value)}
          aria-label={showQr ? `Show ${alt} photo` : `Show ${alt} QR code`}
          title={showQr ? "Show photo" : "Show QR code"}
          className="absolute -bottom-2 -right-2 z-10 inline-flex size-8 items-center justify-center rounded-full border border-border bg-primary text-background shadow-md transition-opacity hover:opacity-90"
        >
          {showQr ? (
            <User className="size-4" aria-hidden />
          ) : (
            <QrCode className="size-4" aria-hidden />
          )}
        </button>
      )}
    </div>
  )
}

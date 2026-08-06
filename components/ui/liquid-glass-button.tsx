"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Adapted from the standard shadcn community "liquid-glass-button"
 * component — the same remap pattern as every other `components/ui/*`
 * primitive in this project: shadcn's CSS-variable tokens (bg-primary,
 * text-primary-foreground, bg-secondary, bg-destructive, bg-background,
 * bg-accent, border-input, ring-ring, ...) don't exist here, swapped for
 * the real ones (ground/ground-alt/ink/hairline). `rounded-md`/`rounded-lg`
 * don't exist either (this project's radius scale is only `none`/`full`) —
 * since this file replaces the site's existing oval `PillButton`, every
 * radius in it is `rounded-full` rather than picking an arbitrary pixel
 * value, so the shape stays a true pill throughout (button, shadow
 * overlay, and the backdrop-filter clip all agree).
 *
 * One real fix beyond the token remap: the source hardcodes the glass
 * filter's `id="container-glass"` — fine for the demo's single instance,
 * but this button is used sitewide (many `PillButton` call sites, several
 * on the same page), so multiple instances would collide on one DOM id.
 * Generated per-instance via `useId()` instead.
 */

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-ground hover:bg-ink/90",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
        cool: "inset-shadow-2xs inset-shadow-white/10 bg-linear-to-t border border-b-2 border-ink/40 from-ink to-ink/85 shadow-md shadow-ink/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 text-ground",
        outline: "border border-hairline bg-ground hover:bg-ground-alt hover:text-ink",
        secondary: "bg-ground-alt text-ink hover:bg-ground-alt/80",
        ghost: "hover:bg-ground-alt hover:text-ink",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ink focus-visible:ring-ink/50 focus-visible:ring-[3px] aria-invalid:ring-red-600/20 aria-invalid:border-red-600",
  {
    variants: {
      variant: {
        // Was a transparent shell entirely relying on LiquidGlassOverlay's
        // shadow/backdrop-filter chrome for its visible shape — now that
        // overlay renders nothing (flat, no-glow direction), the pill
        // needs its own real edge: a plain hairline border in whatever
        // color the text already is (PillButton's `dark` prop still just
        // swaps text color, and the border rides along with it for free).
        default: "border border-current bg-transparent hover:scale-105 duration-300 transition text-ink",
        destructive: "bg-red-600 text-white hover:bg-red-600/90 focus-visible:ring-red-600/20",
        outline: "border border-hairline bg-ground hover:bg-ground-alt hover:text-ink",
        secondary: "bg-ground-alt text-ink hover:bg-ground-alt/80",
        ghost: "hover:bg-ground-alt hover:text-ink",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 text-xs gap-1.5 px-4 has-[>svg]:px-4",
        lg: "h-10 rounded-full px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-full px-8 has-[>svg]:px-6",
        xxl: "h-14 rounded-full px-10 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  // NOTE: `asChild` is preserved for fidelity with the upstream component,
  // but it only actually works for a single plain child — Radix Slot clones
  // props onto exactly one element, and `Comp` here always wraps several
  // (the shadow overlay, the backdrop-filter div, the content, the SVG
  // filter). That's an upstream quirk, unexercised by its own demo too.
  // For a polymorphic root (e.g. rendering as a `next/link` Link, which is
  // what this project's PillButton needs), compose `LiquidGlassOverlay` +
  // `liquidbuttonVariants` directly instead — see PillButton.tsx.
  const Comp = asChild ? Slot : "button"
  const filterId = React.useId()

  return (
    <Comp
      data-slot="button"
      className={cn(
        "relative",
        liquidbuttonVariants({ variant, size, className })
      )}
      {...props}
    >
      <LiquidGlassOverlay filterId={filterId} />
      <div className="pointer-events-none relative z-10">
        {children}
      </div>
    </Comp>
  )
}

/**
 * Used to render a frosted-glass shadow/backdrop-filter chrome (an inset
 * shadow stack plus an SVG turbulence distortion) — replaced with nothing
 * per a flat, no-glow/no-shine direction: the pill's own hairline border
 * (see `liquidbuttonVariants`' default variant) carries the shape now.
 * Kept as a no-op export, not deleted, so neither call site (`LiquidButton`
 * below, `PillButton`) needs to change.
 */
export function LiquidGlassOverlay(_props: { filterId: string }) {
  return null
}

type ColorVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze";

interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
}

const colorVariants: Record<
  ColorVariant,
  {
    outer: string;
    inner: string;
    button: string;
    textColor: string;
    textShadow: string;
  }
> = {
  default: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button: "bg-gradient-to-b from-[#B9B9B9] to-[#969696]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  primary: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-ink via-ground-alt to-ground-alt",
    button: "bg-gradient-to-b from-ink to-ink/40",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(30_58_138_/_100%)]",
  },
  success: {
    outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner: "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    button: "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner: "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    button: "bg-gradient-to-b from-[#F08D8F] to-[#A45253]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
  gold: {
    outer: "bg-gradient-to-b from-[#917100] to-[#EAD98F]",
    inner: "bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]",
    button: "bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]",
    textColor: "text-[#FFFDE5]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(178_140_2_/_100%)]",
  },
  bronze: {
    outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]",
    inner: "bg-gradient-to-b from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]",
    button: "bg-gradient-to-b from-[#FFE3C9] to-[#A36F3D]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]",
  },
};

const metalButtonVariants = (
  variant: ColorVariant = "default",
  isPressed: boolean,
  isHovered: boolean,
  isTouchDevice: boolean,
) => {
  const colors = colorVariants[variant];
  const transitionStyle = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

  return {
    wrapper: cn(
      "relative inline-flex transform-gpu rounded-full p-[1.25px] will-change-transform",
      colors.outer,
    ),
    wrapperStyle: {
      transform: isPressed
        ? "translateY(2.5px) scale(0.99)"
        : "translateY(0) scale(1)",
      boxShadow: isPressed
        ? "0 1px 2px rgba(0, 0, 0, 0.15)"
        : isHovered && !isTouchDevice
          ? "0 4px 12px rgba(0, 0, 0, 0.12)"
          : "0 3px 8px rgba(0, 0, 0, 0.08)",
      transition: transitionStyle,
      transformOrigin: "center center",
    },
    inner: cn(
      "absolute inset-[1px] transform-gpu rounded-full will-change-transform",
      colors.inner,
    ),
    innerStyle: {
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none",
    },
    button: cn(
      "relative z-10 m-[1px] rounded-full inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden px-6 py-2 text-sm leading-none font-semibold will-change-transform outline-none",
      colors.button,
      colors.textColor,
      colors.textShadow,
    ),
    buttonStyle: {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none",
    },
  };
};

const ShineEffect = ({ isPressed }: { isPressed: boolean }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300",
        isPressed ? "opacity-20" : "opacity-0",
      )}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
    </div>
  );
};

const MetalButton = React.forwardRef<
  HTMLButtonElement,
  MetalButtonProps
>(({ children, className, variant = "default", ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const buttonText = children || "Button";
  const variants = metalButtonVariants(
    variant,
    isPressed,
    isHovered,
    isTouchDevice,
  );

  const handleInternalMouseDown = () => {
    setIsPressed(true);
  };
  const handleInternalMouseUp = () => {
    setIsPressed(false);
  };
  const handleInternalMouseLeave = () => {
    setIsPressed(false);
    setIsHovered(false);
  };
  const handleInternalMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };
  const handleInternalTouchStart = () => {
    setIsPressed(true);
  };
  const handleInternalTouchEnd = () => {
    setIsPressed(false);
  };
  const handleInternalTouchCancel = () => {
    setIsPressed(false);
  };

  return (
    <div className={variants.wrapper} style={variants.wrapperStyle}>
      <div className={variants.inner} style={variants.innerStyle}></div>
      <button
        ref={ref}
        className={cn(variants.button, className)}
        style={variants.buttonStyle}
        {...props}
        onMouseDown={handleInternalMouseDown}
        onMouseUp={handleInternalMouseUp}
        onMouseLeave={handleInternalMouseLeave}
        onMouseEnter={handleInternalMouseEnter}
        onTouchStart={handleInternalTouchStart}
        onTouchEnd={handleInternalTouchEnd}
        onTouchCancel={handleInternalTouchCancel}
      >
        <ShineEffect isPressed={isPressed} />
        {buttonText}
        {isHovered && !isPressed && !isTouchDevice && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t rounded-full from-transparent to-white/5" />
        )}
      </button>
    </div>
  );
});

MetalButton.displayName = "MetalButton";

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton, MetalButton }

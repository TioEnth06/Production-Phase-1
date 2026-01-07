# Device Detection Hooks

This directory contains hooks for detecting device categories and screen sizes.

## Device Categories

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px  
- **Desktop**: >= 1024px

## Usage

### `useDevice()` - Full Device Information

Returns complete device information including category, boolean flags, and current width.

```tsx
import { useDevice } from "@/hooks/use-device";

function MyComponent() {
  const { category, isMobile, isTablet, isDesktop, width } = useDevice();

  return (
    <div>
      <p>Device: {category}</p>
      <p>Width: {width}px</p>
      {isMobile && <p>Mobile view</p>}
      {isTablet && <p>Tablet view</p>}
      {isDesktop && <p>Desktop view</p>}
    </div>
  );
}
```

### `useIsMobile()` - Mobile Detection

Returns `true` if the device is mobile (< 768px).

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

function MyComponent() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### `useIsTablet()` - Tablet Detection

Returns `true` if the device is tablet (768px - 1023px).

```tsx
import { useIsTablet } from "@/hooks/use-device";

function MyComponent() {
  const isTablet = useIsTablet();

  return (
    <div>
      {isTablet && <TabletSpecificContent />}
    </div>
  );
}
```

### `useIsDesktop()` - Desktop Detection

Returns `true` if the device is desktop (>= 1024px).

```tsx
import { useIsDesktop } from "@/hooks/use-device";

function MyComponent() {
  const isDesktop = useIsDesktop();

  return (
    <div>
      {isDesktop && <DesktopFeatures />}
    </div>
  );
}
```

## Tailwind CSS Breakpoints

For responsive design with Tailwind CSS classes:

- **Mobile**: Use default classes (no prefix) or `sm:` prefix for >= 640px
- **Tablet**: Use `md:` prefix for >= 768px
- **Desktop**: Use `lg:` prefix for >= 1024px

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## TypeScript Types

```typescript
type DeviceCategory = "mobile" | "tablet" | "desktop";

interface DeviceInfo {
  category: DeviceCategory;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}
```


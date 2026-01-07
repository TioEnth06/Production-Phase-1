import * as React from "react";

// Device breakpoints
const MOBILE_BREAKPOINT = 768; // < 768px
const TABLET_BREAKPOINT = 1024; // 768px - 1023px
// Desktop: >= 1024px

export type DeviceCategory = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  category: DeviceCategory;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export function useDevice() {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>(() => {
    if (typeof window === "undefined") {
      return {
        category: "desktop",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1024,
      };
    }

    const width = window.innerWidth;
    const isMobile = width < MOBILE_BREAKPOINT;
    const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
    const isDesktop = width >= TABLET_BREAKPOINT;

    return {
      category: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
      isMobile,
      isTablet,
      isDesktop,
      width,
    };
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < MOBILE_BREAKPOINT;
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
      const isDesktop = width >= TABLET_BREAKPOINT;

      setDeviceInfo({
        category: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
        isMobile,
        isTablet,
        isDesktop,
        width,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}

// Convenience hooks
export function useIsMobile() {
  const { isMobile } = useDevice();
  return isMobile;
}

export function useIsTablet() {
  const { isTablet } = useDevice();
  return isTablet;
}

export function useIsDesktop() {
  const { isDesktop } = useDevice();
  return isDesktop;
}


// Web Audio API and Browser Notification Helper

// Synthesize a polite, clear notification chime (Ding-Dong 880Hz -> 1320Hz)
export function playNotificationSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // First chime note (A5 - 880Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second chime note (E6 - 1318.5Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, now + 0.12);
    gain2.gain.setValueAtTime(0.3, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.55);
  } catch (e) {
    console.warn('Audio chime playback not supported or blocked by browser policy:', e);
  }
}

// Request Desktop/Mobile Browser Notification Permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'default') {
    try {
      return await Notification.requestPermission();
    } catch {
      return Notification.permission;
    }
  }

  return Notification.permission;
}

// Show Desktop System Notification
export function showDesktopNotification(
  title: string,
  options?: {
    body?: string;
    icon?: string;
    tag?: string;
    onClickUrl?: string;
  }
): boolean {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        body: options?.body,
        icon: options?.icon || 'https://api.iconify.design/lucide:bell.svg?color=%23f05a22',
        tag: options?.tag || 'dermapink-admin-alert'
      });

      notif.onclick = () => {
        window.focus();
        if (options?.onClickUrl) {
          window.open(options.onClickUrl, '_blank');
        }
        notif.close();
      };
      return true;
    } catch (e) {
      console.warn('Failed to display desktop notification:', e);
      return false;
    }
  }

  return false;
}

// Complete multi-channel reception trigger
export function triggerAdminAlertReception(details: {
  title: string;
  body: string;
  onClickUrl?: string;
}): void {
  // 1. Play sound chime
  playNotificationSound();

  // 2. Vibrate on mobile devices (if supported)
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([150, 80, 150]);
    } catch {}
  }

  // 3. System desktop notification
  showDesktopNotification(details.title, {
    body: details.body,
    onClickUrl: details.onClickUrl
  });
}

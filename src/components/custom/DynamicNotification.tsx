import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification { id: string; message: string; type: 'success' | 'info' | 'warning'; }

let notificationId = 0;
const listeners: Set<(notifications: Notification[]) => void> = new Set();
let notifications: Notification[] = [];

function emit() { listeners.forEach((fn) => fn([...notifications])); }

export function showNotification(message: string, type: Notification['type'] = 'info') {
  const id = `${++notificationId}`;
  notifications = [...notifications, { id, message, type }];
  emit();
  setTimeout(() => { notifications = notifications.filter((n) => n.id !== id); emit(); }, 4000);
}

export const DynamicNotification: React.FC = () => {
  const [items, setItems] = useState<Notification[]>([]);
  useEffect(() => { const cb = (n: Notification[]) => setItems(n); listeners.add(cb); return () => { listeners.delete(cb); }; }, []);

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return { bg: 'rgba(0, 229, 255, 0.1)', border: 'rgba(0, 229, 255, 0.2)', text: '#00e5ff' };
      case 'warning': return { bg: 'rgba(255, 184, 77, 0.1)', border: 'rgba(255, 184, 77, 0.2)', text: '#ffb84d' };
      default: return { bg: 'rgba(255, 75, 36, 0.1)', border: 'rgba(255, 75, 36, 0.2)', text: '#ff4b24' };
    }
  };

  return (
    <div className="fixed top-20 left-1/2 z-[150] flex flex-col items-center gap-2" style={{ transform: 'translateX(-50%)' }}>
      <AnimatePresence>
        {items.map((notification) => {
          const colors = getColor(notification.type);
          return (
            <motion.div key={notification.id} className="px-5 py-3 rounded-pill text-sm font-medium backdrop-blur-xl"
              style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text, boxShadow: `0 4px 24px ${colors.bg}` }}
              initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              {notification.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
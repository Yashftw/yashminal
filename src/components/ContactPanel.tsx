import { useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { playOpenSound } from "@/lib/sounds";

const ContactPanel = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    playOpenSound();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSent(false);
    }, 4000);
  };

  return (
    <PanelWrapper title="CONTACT ME">
      <div className="font-terminal text-sm space-y-4">
        {sent ? (
          <div className="flicker-in space-y-2 py-6 text-center">
            <div className="text-primary text-lg font-bold tracking-wider">TRANSMISSION SENT</div>
            <div className="text-muted-foreground text-xs blink-cursor">AWAITING RESPONSE...</div>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <label className="font-pixel text-[9px] text-muted-foreground tracking-wider">NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your designation..."
                className="w-full bg-background border border-border px-3 py-2 font-terminal text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(var(--primary)/0.3)] transition-all duration-300"
              />
            </div>
            <div className="space-y-1">
              <label className="font-pixel text-[9px] text-muted-foreground tracking-wider">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your comm channel..."
                className="w-full bg-background border border-border px-3 py-2 font-terminal text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(var(--primary)/0.3)] transition-all duration-300"
              />
            </div>
            <div className="space-y-1">
              <label className="font-pixel text-[9px] text-muted-foreground tracking-wider">MESSAGE</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Compose your transmission..."
                rows={4}
                className="w-full bg-background border border-border px-3 py-2 font-terminal text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(var(--primary)/0.3)] transition-all duration-300 resize-none"
              />
            </div>
            <button
              onClick={handleSend}
              className="interactive w-full border-2 border-primary bg-primary/10 px-4 py-2.5 font-pixel text-[10px] text-primary tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              TRANSMIT MESSAGE
            </button>
          </>
        )}
      </div>
    </PanelWrapper>
  );
};

export default ContactPanel;

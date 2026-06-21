import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function HelpModal({ open, onClose }: HelpModalProps) {
  const [contactType, setContactType] = useState<"instagram" | "gmail">("gmail");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitted(true);

    try {
      const response = await fetch("https://formspree.io/f/mgojwlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          contactType: contactType,
          contactValue: value,
          message: message || "No message provided"
        })
      });

      if (response.ok) {
        toast.success("Request submitted!", {
          description: "Our team will contact you shortly.",
        });
      } else {
        throw new Error("Formspree response not ok");
      }
    } catch (err) {
      toast.error("Failed to send request", {
        description: "Please check your network and try again."
      });
      setSubmitted(false);
      return;
    }

    setTimeout(() => {
      setSubmitted(false);
      setValue("");
      setMessage("");
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-md glass-panel rounded-2xl border border-primary/30 shadow-[0_0_60px_rgba(139,92,246,0.25)] pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white">Get Help</h2>
                    <p className="text-xs text-muted-foreground">Our team will contact you</p>
                  </div>
                </div>
                <button
                  data-testid="button-close-help"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Share your Instagram handle or Gmail address and our support team will reach out to you as soon as possible.
                </p>

                {/* Contact type toggle */}
                <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1 gap-1">
                  {(["gmail", "instagram"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      data-testid={`tab-contact-${type}`}
                      onClick={() => { setContactType(type); setValue(""); }}
                      className={`flex-1 py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                        contactType === type
                          ? "bg-primary text-white box-glow"
                          : "text-muted-foreground hover:text-white"
                      }`}
                    >
                      {type === "gmail" ? "Gmail" : "Instagram"}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {contactType === "gmail" ? "Your Gmail Address" : "Your Instagram Handle"}
                  </label>
                  <input
                    data-testid="input-contact"
                    type={contactType === "gmail" ? "email" : "text"}
                    placeholder={contactType === "gmail" ? "you@gmail.com" : "@yourusername"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                  />
                </div>

                {/* Message (optional) */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Message <span className="normal-case text-muted-foreground/60">(optional)</span>
                  </label>
                  <textarea
                    data-testid="input-message"
                    placeholder="Describe your issue or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  data-testid="button-submit-help"
                  type="submit"
                  disabled={submitted}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] box-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? (
                    <span>Submitted!</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

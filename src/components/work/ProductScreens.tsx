type ScreenId =
  | "cafe"
  | "jewellery"
  | "crm"
  | "clinic"
  | "fashion"
  | "logistics"
  | "finance"
  | "agents";

function Chrome({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 border-b px-3 py-2 ${
        dark ? "border-white/10 bg-[#07111f]" : "border-black/5 bg-white/90"
      }`}
    >
      <span className="flex gap-1">
        <i className="block h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <i className="block h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <i className="block h-1.5 w-1.5 rounded-full bg-[#28c840]" />
      </span>
      <span className={`truncate text-[8px] tracking-wide ${dark ? "text-white/45" : "text-navy/40"}`}>
        {title}
      </span>
    </div>
  );
}

export function ProductScreen({ id }: { id: ScreenId }) {
  switch (id) {
    case "jewellery":
      return (
        <div className="h-full bg-[#f7f1e8] text-[#2b2118]">
          <Chrome title="sonamaison.com" />
          <div className="screen-pan">
            <div className="px-4 pb-8 pt-5">
              <p className="text-[7px] uppercase tracking-[0.28em] text-[#b08948]">Sona Maison</p>
              <h4 className="mt-2 font-display text-[15px] font-semibold leading-tight">Heirloom gold, quietly made.</h4>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {["#d4af77", "#f3e6d0", "#8c6a3a"].map((c) => (
                  <div key={c} className="aspect-square rounded-md" style={{ background: c }} />
                ))}
              </div>
              <div className="mt-3 rounded-full bg-[#2b2118] px-3 py-1.5 text-center text-[8px] text-[#f7f1e8]">
                Shop the collection
              </div>
              <p className="mt-4 text-[8px] leading-relaxed text-[#2b2118]/60">
                Bridal · Everyday · Men&apos;s · Made to order in Ludhiana.
              </p>
            </div>
          </div>
        </div>
      );
    case "crm":
      return (
        <div className="h-full bg-[#07111f] text-white">
          <Chrome title="helios.omgeaks" dark />
          <div className="screen-pan px-3 py-3">
            <p className="text-[7px] uppercase tracking-[0.2em] text-sky">Revenue OS</p>
            <h4 className="mt-1 font-display text-[13px] font-semibold">Pipeline this week</h4>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {[
                ["Qualified", "18"],
                ["Proposal", "7"],
                ["Won", "4"],
              ].map(([l, n]) => (
                <div key={l} className="rounded-md border border-white/10 bg-white/5 p-2">
                  <p className="text-[7px] text-white/45">{l}</p>
                  <p className="font-display text-sm text-gold">{n}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              {["Acme Foods · 2.4L", "North Clinic · 90k", "Atelier Noir · 1.1L"].map((row, i) => (
                <div key={row} className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1.5">
                  <span className="text-[8px] text-white/80">{row}</span>
                  <span className="h-1 w-10 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full bg-sky" style={{ width: `${70 - i * 18}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "clinic":
      return (
        <div className="h-full bg-[#f4f8fb] text-navy">
          <div className="bg-navy px-3 py-4 text-white">
            <p className="text-[7px] uppercase tracking-[0.2em] text-sky">Pulse Clinic</p>
            <p className="mt-1 font-display text-sm font-semibold">Good morning, Dr. Kaur</p>
          </div>
          <div className="screen-pan space-y-2 p-3">
            {["09:30 · New patient", "10:15 · Follow-up", "11:00 · Labs review"].map((s) => (
              <div key={s} className="rounded-xl bg-white p-2.5 shadow-sm">
                <p className="text-[9px] font-medium">{s}</p>
                <p className="mt-0.5 text-[7px] text-muted">Room 2 · 12 min</p>
              </div>
            ))}
            <div className="rounded-xl bg-sky/10 p-2.5 text-[8px] text-deep-blue">3 reminders queued</div>
          </div>
        </div>
      );
    case "fashion":
      return (
        <div className="h-full bg-[#0c0c0c] text-white">
          <Chrome title="ateliernoir.com" dark />
          <div className="screen-pan">
            <div className="h-28 bg-gradient-to-br from-[#2a2a2a] to-[#111]" />
            <div className="px-4 py-3">
              <p className="text-[7px] uppercase tracking-[0.28em] text-gold">SS26</p>
              <h4 className="mt-1 font-display text-[15px] font-semibold">Atelier Noir</h4>
              <p className="mt-2 text-[8px] leading-relaxed text-white/55">
                Lookbook 04 — cut in navy wool, shot in natural light.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                <div className="h-16 rounded bg-[#1c1c1c]" />
                <div className="h-16 rounded bg-[#262018]" />
              </div>
            </div>
          </div>
        </div>
      );
    case "logistics":
      return (
        <div className="h-full bg-[#07111f] text-white">
          <Chrome title="vertex.freight" dark />
          <div className="screen-pan p-3">
            <h4 className="font-display text-[13px] font-semibold">Live lanes</h4>
            <div className="mt-3 space-y-1.5">
              {[
                ["LDH → DEL", "On time"],
                ["AMD → BOM", "Exception"],
                ["PNQ → HYD", "Loading"],
              ].map(([lane, st]) => (
                <div key={lane} className="flex items-center justify-between rounded-md border border-white/10 px-2 py-1.5">
                  <span className="text-[8px]">{lane}</span>
                  <span className={`text-[7px] ${st === "Exception" ? "text-orange" : "text-sky"}`}>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "finance":
      return (
        <div className="h-full bg-[#051937] text-white">
          <div className="px-3 py-5">
            <p className="text-[7px] uppercase tracking-[0.2em] text-sky">Nexus Ledger</p>
            <p className="mt-3 text-[8px] text-white/50">Available</p>
            <p className="font-display text-xl font-semibold">₹ 8,42,190</p>
            <div className="mt-4 grid grid-cols-2 gap-1.5">
              <div className="rounded-xl bg-white/8 p-2 text-[8px]">Send</div>
              <div className="rounded-xl bg-sky/20 p-2 text-[8px]">Request</div>
            </div>
            <div className="mt-4 space-y-1.5">
              {["Payout · Vendor 14", "Salary run", "GST hold"].map((r) => (
                <div key={r} className="rounded-lg bg-white/5 px-2 py-1.5 text-[8px] text-white/70">
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "agents":
      return (
        <div className="h-full bg-[#07111f] text-white">
          <Chrome title="aether.desk" dark />
          <div className="screen-pan p-3">
            <p className="text-[7px] uppercase tracking-[0.2em] text-orange">Agent desk</p>
            <h4 className="mt-1 font-display text-[13px] font-semibold">Research · running</h4>
            <div className="mt-3 space-y-1.5 text-[8px] text-white/70">
              <p className="rounded-md bg-white/5 px-2 py-1.5">14 sources synthesised</p>
              <p className="rounded-md bg-sky/15 px-2 py-1.5 text-sky">Awaiting human approval</p>
              <p className="rounded-md bg-white/5 px-2 py-1.5">CRM draft queued</p>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="h-full bg-[#f6efe6]">
          <Chrome title="ateliercafe.com" />
          <div className="flex h-full items-center justify-center font-display text-sm text-[#5c4033]">
            Café
          </div>
        </div>
      );
  }
}

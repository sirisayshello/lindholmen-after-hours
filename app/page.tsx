"use client";

import { supabase } from "@/supabase/client";

export default function Home() {
  // Join a room/topic. Can be anything except for 'realtime'.
  const channel = supabase.channel("room-1");

  // Simple function to log any messages we receive
  function messageReceived(payload: unknown) {
    console.log(payload);
  }

  // Subscribe to the Channel
  channel
    .on("broadcast", { event: "test" }, (payload) => messageReceived(payload))
    .subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
    });

  // Join a room/topic. Can be anything except for 'realtime'.

  const send = () => {
    console.log("SENDING");

    channel.send({
      type: "broadcast",
      event: "test",
      payload: { message: "hello, world" },
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 items-center font-mono text-sm">
        <p className="left-0 top-0 flex w-full justify-center  dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Lindholmen by night
        </p>

        <button onClick={send}>SEND SEND</button>

        <p className="">
          Det började med ett märkligt rån. En blodbuss försvann spårlöst från
          Lärdomsgatan på Lindholmen och hittades senare på natten kvaddad i
          Kiellers park - helt tömd på blod. Händelsen skakade göteborgarna och
          konspirationsteorier om att vampyrer skulle befinna sig i stadsdelen
          började spridas. Kalla fall om ouppklarade försvinnanden blev varma
          igen och polischefen utlyste utegångsförbud i stadsdelen från klockan
          22:00. Inte en så big deal egentligen, eftersom Lindholmen töms på
          folk redan vid 17:30. Men ändå. Det är tanken som räknas. Hur som
          helst. Människor reagerar på antingen ett eller ett annat sätt när det
          kommer till förbud. Det finns de som lyssnar och stannar hemma. Men
          desto fler gör precis tvärtom. Lindholmen blev plötsligt en hot spot
          för kicksökare och sanningssägare och underliga fynd har registrerats
          på olika platser runt om i stadsdelen. Bland pålästa är vampyrerna
          numera en vedertagen sanning. De har kommit till Lindholmen och de
          verkar hungriga.
        </p>
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      {/* <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}
    </main>
  );
}

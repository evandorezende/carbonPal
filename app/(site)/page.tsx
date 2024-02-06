"use client";

import CarbonForm from "@/components/carbon/carbon-form";
import CarbonView from "@/components/carbon/carbon-view";
import { useState } from "react";

export default function Home() {
  const [myResults, setMyResults] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-[100px] p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed p-4 left-0 top-0 flex w-full justify-center text-black dark:text-white border-b border-gray-300 from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started calculating your carbon emissions&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t text-black dark:text-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            By CarbonPal
          </p>
        </div>
      </div>
      <div className="z-10 max-w-xl w-full justify-center">
        {myResults ? (
          <CarbonView setResults={setMyResults} myResults={myResults} />
        ) : (
          <CarbonForm setResults={setMyResults} />
        )}
      </div>

      <div>
        <p className="text-center p-4 left-0 top-0 flex w-full justify-center text-black text-sm dark:text-white border-b border-gray-300 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          This app calcullates the carbon footprint of a delivery based on the
          weight, volume, distance and equipment used. It also provides an
          estimated cost to offset this emission with carbon capture companies.
          The method used to calculate the carbon footprint is based on the
          Greenhouse Gas Protocol, which is the most widely used international
          accounting tool for government and business leaders to understand,
          quantify, and manage greenhouse gas emissions. The resullts are
          presented "as it is" and should not be used as a final decision making
          tool.
        </p>
      </div>
    </main>
  );
}

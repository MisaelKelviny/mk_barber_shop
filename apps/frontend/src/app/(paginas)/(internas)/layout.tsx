"use client";

import ForceUsers from "@/components/shared/ForceUsers";
import Page from "@/components/shared/PAge";
import { ScheduleProvider } from "@/data/contexts/ScheduleContext";

export default function Layout(props: any) {
  return (
    <ForceUsers>
      <ScheduleProvider>
        <Page>{props.children}</Page>
      </ScheduleProvider>
    </ForceUsers>
  );
}

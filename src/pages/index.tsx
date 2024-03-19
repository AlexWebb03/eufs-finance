import Head from "next/head";
import Link from "next/link";
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { reimbursements } from "eufs-finance/server/api/routers/airtable";

import Chart from "eufs-finance/pages/chart.tsx";

import { api } from "eufs-finance/utils/api";

export default function Home() {
  const hello = api.airtable.requests.useQuery();

  const {isLoading, data} = api.airtable.requests.useQuery();

  return (
    <>
      <Head>
        <title>Edinburgh University Formula Student</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Edinburgh University Formula Student
          </h1>

          <Chart reimbursements={isLoading ? [] : data!}></Chart>

          <p className="text-2xl text-white">
            
          </p>
        </div>
      </main>
    </>
  );
}


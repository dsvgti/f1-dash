"use client";

import clsx from "clsx";

import { useSocket } from "@/context/SocketContext";

import SessionInfo from "@/components/SessionInfo";
import WeatherInfo from "@/components/WeatherInfo";
import TrackInfo from "@/components/TrackInfo";
import LeaderBoard from "@/components/LeaderBoard";
import Qualifying from "@/components/Qualifying";
import RaceControl from "@/components/RaceControl";
import TeamRadios from "@/components/TeamRadios";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import LapCount from "@/components/LapCount";

import Image from "next/image";
import unknownTireIcon from "public/tires/unknown.svg";
import mediumTireIcon from "public/tires/medium.svg";
import interTireIcon from "public/tires/intermediate.svg";
import hardTireIcon from "public/tires/hard.svg";
import softTireIcon from "public/tires/soft.svg";
import wetTireIcon from "public/tires/wet.svg";
import DriverDRS from "@/components/driver/DriverDRS";
import DriverPedals from "@/components/driver/DriverPedals";

export default function Page() {
	const { state, positions, carsData } = useSocket();

	return (
		<div className="flex w-full flex-col">

			{/* Help Bar1 */}
			<div className="hidden flex-row border-b border-zinc-800 justify-between  xl:flex">
				<div className="flex flex-row">
					<div className="flex gap-1">
						<p className="flex items-center gap-1">
							<span className="size-4 rounded-md bg-white ml-2" /> <small>White</small>
						</p>
						<p className="mr-4 mt-2.5"><div className="flex flex-row"><small>last lap time</small></div></p>
					</div>

					<div className="flex gap-1">
						<p className="flex items-center gap-1 text-yellow-500">
							<span className="size-4 rounded-md bg-yellow-500" /> <small>Yellow</small>
						</p>
						<p className="mr-4  mt-2"><small>slower than personal best</small></p>
					</div>

					<div className="flex gap-1">
						<p className="flex items-center gap-1 text-emerald-500">
							<span className="size-4 rounded-md bg-emerald-500" /> <small>Green</small>
						</p>
						<p className="mr-4  mt-2"><small>personal best</small></p>
					</div>

					<div className="flex gap-1">
						<p className="flex items-center gap-1 text-violet-500">
							<span className="size-4 rounded-md bg-violet-500" /> <small>Purple</small>
						</p>
						<p className="mr-4  mt-2"><small>overall best</small></p>
					</div>
				</div>
				<div className="flex flex-row gap-2 ml-15">
					<p className="rounded-md bg-violet-800 bg-opacity-30 p-2"><small>Fastest overall lap time.</small></p>
					<p className="rounded-md border p-2 opacity-50"><small>Crashed or retired.</small></p>
					<p className="rounded-md bg-red-800 bg-opacity-30 p-2"><small>In the danger zone during qualifying.</small></p>
				</div>
			</div>

			{/* Help Bar2 */}
			<div className="hidden flex-row border-b border-zinc-800 justify-between  xl:flex">
				
				<div className="m-1 flex gap-4">
					<div className="flex items-center gap-2">
						<Image src={softTireIcon} alt="soft" className="size-8" />
						<p><small>Soft</small></p>
					</div>

					<div className="flex items-center gap-2">
						<Image src={mediumTireIcon} alt="medium" className="size-8" />
						<p><small>Medium</small></p>
					</div>

					<div className="flex items-center gap-2">
						<Image src={hardTireIcon} alt="hard" className="size-8" />
						<p><small>Hard</small></p>
					</div>

					<div className="flex items-center gap-2">
						<Image src={interTireIcon} alt="intermediate" className="size-8" />
						<p><small>Intermediate</small></p>
					</div>

					<div className="flex items-center gap-2">
						<Image src={wetTireIcon} alt="wet" className="size-8" />
						<p>Wet</p>
					</div>

					<div className="flex items-center gap-2">
						<Image src={unknownTireIcon} alt="unknown" className="size-8" />
						<p><small>Unknown</small></p>
					</div>
				</div>

				<div className="m1-1 flex flex-row gap-4">
					<div className="flex items-center gap-6">
						<div className="w-[4rem]">
							<DriverPedals className="bg-red-500" value={1} maxValue={3} />
						</div>

						<p>
						<small>Breaking</small>
						</p>
					</div>

					<div className="flex items-center gap-6">
						<div className="w-[4rem]">
							<DriverPedals className="bg-emerald-500" value={3} maxValue={4} />
						</div>

						<p>
						<small>Throttle</small>
						</p>
					</div>

					<div className="flex items-center gap-6">
						<div className="w-[4rem]">
							<DriverPedals className="bg-blue-500" value={2} maxValue={3} />
						</div>

						<p>
						<small>RPM</small> <span className="text-zinc-500"><small>(0 - 15'000)</small></span>
						</p>
					</div>
				</div>

				<div className="m-1 flex flex-row gap-4">
					<div className="flex items-center gap-2">
						<div className="w-[4rem]">
							<DriverDRS on={false} possible={false} inPit={false} pitOut={false} />
						</div>

						<p><small>Off</small></p>
					</div>

					<div className="flex items-center gap-2">
						<div className="w-[4rem]">
							<DriverDRS on={false} possible={true} inPit={false} pitOut={false} />
						</div>

						<p><small>Possible In next zone</small></p>
					</div>

					<div className="flex items-center gap-2">
						<div className="w-[4rem]">
							<DriverDRS on={true} possible={false} inPit={false} pitOut={false} />
						</div>

						<p><small>Active</small></p>
					</div>

					<div className="flex items-center gap-2">
						<div className="w-[4rem]">
							<DriverDRS on={false} possible={false} inPit={true} pitOut={false} />
						</div>

						<p><small>PIT</small></p>
					</div>
				</div>

			</div>

			{/* md upwards, desktop ipad design */}
			<div className="hidden flex-wrap items-center justify-between gap-2 overflow-hidden border-b border-zinc-800 p-2 px-2 md:flex">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div className="flex w-full items-center justify-between md:w-auto">
						<SessionInfo session={state?.sessionInfo} clock={state?.extrapolatedClock} timingData={state?.timingData} />
					</div>

					<WeatherInfo weather={state?.weatherData} />
				</div>

				<TrackInfo track={state?.trackStatus} lapCount={state?.lapCount} />
			</div>

			{/* sm, mobile design */}
			<div className="flex w-full flex-col divide-y divide-zinc-800 border-b border-zinc-800 md:hidden">
				<div className="p-2">
					<SessionInfo session={state?.sessionInfo} clock={state?.extrapolatedClock} timingData={state?.timingData} />
				</div>

				<div className="p-2">
					<WeatherInfo weather={state?.weatherData} />
				</div>

				<div className="flex justify-between overflow-hidden p-4">
					<TrackInfo track={state?.trackStatus} lapCount={state?.lapCount} />
					<LapCount lapCount={state?.lapCount} />
				</div>
			</div>

			<div className={clsx("flex w-full flex-col divide-y divide-zinc-800")}>
				<div className={clsx("flex w-full flex-col divide-y divide-zinc-800", "xl:flex-row xl:divide-x xl:divide-y-0")}>
					<div className={clsx("flex flex-col divide-y divide-zinc-800", "xl:min-w-0 xl:flex-grow")}>
						{state?.sessionInfo?.type === "Qualifying" && (
							<div className="overflow-x-auto">
								<Qualifying
									drivers={state?.driverList}
									driversTiming={state?.timingData}
									appDriversTiming={state?.timingAppData}
								/>
							</div>
						)}

						<div className="hidden w-full xl:block">
							<Map
								circuitKey={state?.sessionInfo?.meeting.circuit.key}
								positions={positions}
								drivers={state?.driverList}
								timingDrivers={state?.timingData}
								trackStatus={state?.trackStatus}
								raceControlMessages={state?.raceControlMessages?.messages}
							/>
						</div>

						<div
							className={clsx(
								"flex w-full flex-col divide-y divide-zinc-800",
								"md:min-w-0 md:flex-row md:divide-x md:divide-y-0",
								"xl:flex-1 xl:flex-col xl:divide-x-0 xl:divide-y xl:pl-2",
								"2xl:min-w-0 2xl:flex-row 2xl:divide-x 2xl:divide-y-0",
							)}
						>
							<div
								className={clsx(
									"h-96 overflow-y-auto p-2",
									"md:w-1/2",
									"xl:auto xl:mr-0 xl:w-auto xl:flex-grow",
									"2xl:w-1/2",
								)}
							>
								<RaceControl messages={state?.raceControlMessages} utcOffset={state?.sessionInfo?.gmtOffset ?? ""} />
							</div>

							<div
								className={clsx(
									"h-96 overflow-y-auto p-2",
									"md:w-1/2",
									"xl:auto xl:mr-0 xl:w-auto xl:flex-grow",
									"2xl:w-1/2",
								)}
							>
								<TeamRadios
									sessionPath={state?.sessionInfo?.path}
									drivers={state?.driverList}
									teamRadios={state?.teamRadio}
								/>
							</div>
						</div>
					</div>
					<div className={clsx("mb-2 overflow-x-auto md:overflow-visible", " xl:flex-[0,0,auto]")}>
						<LeaderBoard
							drivers={state?.driverList}
							driversTiming={state?.timingData}
							driversTimingStats={state?.timingStats}
							driversAppTiming={state?.timingAppData}
							carsData={carsData}
						/>
					</div>
				</div>

				<div className="xl:hidden">
					<Map
						circuitKey={state?.sessionInfo?.meeting.circuit.key}
						positions={positions}
						drivers={state?.driverList}
						timingDrivers={state?.timingData}
						trackStatus={state?.trackStatus}
						raceControlMessages={state?.raceControlMessages?.messages}
					/>
				</div>
			</div>

			<div className="px-2">
				<Footer />
			</div>
		</div>
	);
}

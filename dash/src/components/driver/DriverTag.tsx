import clsx from "clsx";

type Props = {
	teamColor: string;
	short: string;
	position?: number;
	className?: string;
	headShotUrl?: string;
};

export default function DriverTag({ position, teamColor, short, className, headShotUrl }: Props) {
	return (
		<div
			id="walkthrough-driver-position"
			className={clsx(
				"flex w-fit items-center justify-between gap-0.5 rounded-lg bg-zinc-600 px-1 py-1 font-black",
				className,
			)}
			style={{ backgroundColor: `#${teamColor}` }}
		>
			{position && <p className="px-1 text-xl leading-none">{position}</p>}
			<div className="flex">
				{headShotUrl != null && headShotUrl != "" && <img src={headShotUrl} style={{marginLeft:"-12px"}} width="45px" height="45px"></img>}
				<div className="flex h-min w-min items-center justify-center rounded-md bg-white px-1" style={{marginLeft:"-12px"}}>
					<p className="font-mono text-zinc-600" style={{ ...(teamColor && { color: `#${teamColor}` }) }}>
						{short}
					</p>
				</div>
			</div>
		</div>
	);
}

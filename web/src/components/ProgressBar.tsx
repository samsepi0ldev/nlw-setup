interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className='w-full h-3 rounded-xl mt-4 bg-zinc-700'>
      <div
        role='progressbar'
        aria-label='Progresso de hábitos completados nesse dia'
        aria-valuenow={props.progress}
        className='h-3 rounded-xl bg-violet-600 transition-all'
        style={{
          width: `${props.progress}%`
        }}
      ></div>
    </div>
  )
}
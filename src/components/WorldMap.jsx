export default function WorldMap() {
  const nodes = [
    { id: 1, x: '15%', y: '35%', label: 'North America' },
    { id: 2, x: '28%', y: '60%', label: 'South America' },
    { id: 3, x: '48%', y: '30%', label: 'Europe' },
    { id: 4, x: '52%', y: '45%', label: 'Middle East' },
    { id: 5, x: '45%', y: '60%', label: 'Africa' },
    { id: 6, x: '65%', y: '35%', label: 'Central Asia' },
    { id: 7, x: '75%', y: '42%', label: 'Southeast Asia' },
    { id: 8, x: '85%', y: '38%', label: 'East Asia' },
    { id: 9, x: '88%', y: '70%', label: 'Australia' },
  ]

  const connections = [
    [1, 3], [3, 4], [4, 6], [6, 7], [7, 8],
    [3, 5], [1, 2], [4, 5], [7, 9], [6, 8],
    [1, 4], [3, 7],
  ]

  return (
    <div className="relative w-full aspect-[2/1] bg-navy-800/40 rounded-2xl border border-white/5 overflow-hidden">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={`${(i + 1) * 10}%`} y1="0" x2={`${(i + 1) * 10}%`} y2="100%" stroke="#17C3B2" strokeWidth="0.5" />
        ))}
        {[...Array(5)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${(i + 1) * 16}%`} x2="100%" y2={`${(i + 1) * 16}%`} stroke="#17C3B2" strokeWidth="0.5" />
        ))}
      </svg>

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {connections.map(([from, to], idx) => {
          const n1 = nodes.find(n => n.id === from)
          const n2 = nodes.find(n => n.id === to)
          return (
            <line
              key={idx}
              x1={n1.x} y1={n1.y}
              x2={n2.x} y2={n2.y}
              stroke="#17C3B2"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 4"
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: node.x, top: node.y }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-teal-400 node-ping opacity-75" />
            <div className="w-3 h-3 rounded-full bg-teal-400 border-2 border-teal-300 relative z-10" />
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap">
            <span className="bg-navy-800 border border-teal-500/30 text-teal-400 text-xs px-2 py-1 rounded">
              {node.label}
            </span>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-teal-400" />
        <span className="text-gray-400 text-xs">CRB Node</span>
      </div>
    </div>
  )
}

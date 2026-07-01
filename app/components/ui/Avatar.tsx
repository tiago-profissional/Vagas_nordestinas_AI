type AvatarProps = {
  nome: string;
  foto?: string;
};

const colors = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-rose-600",
  "bg-red-600",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-600",
  "bg-green-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
];

export default function Avatar({ nome, foto }: AvatarProps) {
  const initial = nome?.charAt(0).toUpperCase() || "?";

  const color =
    colors[
      nome
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    ];

  if (foto) {
    return (
      <img
        src={foto}
        alt={nome}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full ${color} text-lg font-bold text-white`}
    >
      {initial}
    </div>
  );
}
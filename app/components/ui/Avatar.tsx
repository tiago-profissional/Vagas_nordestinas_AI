type AvatarProps = {
  nome: string;
  foto?: string;
};

export default function Avatar({ nome, foto }: AvatarProps) {
  const inicial = nome.charAt(0).toUpperCase();

  return (
    <div>
      {foto ? (
        <img src={foto} />
      ) : (
        <span>{inicial}</span>
      )}
    </div>
  );
}
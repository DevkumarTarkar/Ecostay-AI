type CardProps = {
  title: string;
  location: string;
  price: string;
};

export default function Card({
  title,
  location,
  price,
}: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>

      <p>{location}</p>

      <p className="text-green-700 font-semibold">
        {price}
      </p>
    </div>
  );
}
type IconProps = {
  className?: string;
};

export default function PencilIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.0459 3.553C13.3167 3.2822 13.3167 2.83087 13.0459 2.57397L11.4212 0.949191C11.1642 0.678395 10.7129 0.678395 10.4421 0.949191L9.16452 2.21985L11.7683 4.82365M0.749023 10.6423V13.2461H3.35283L11.0323 5.55966L8.42851 2.95586L0.749023 10.6423Z" />
    </svg>
  );
}

import { Button } from "./button";

interface HeadingProps {
  title: string;
  description: string;
  length?: number;
}

const Heading = ({ title, description, length }: HeadingProps) => {
  return (
    <div>
      <div className="flex gap-x-4">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {length && (
          <Button
            type="button"
            className="bg-secondary rounded-full cursor-auto"
            variant="outline"
          >
            {length}
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;

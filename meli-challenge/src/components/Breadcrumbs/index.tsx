import { FC, ReactElement } from "react";

const Breadcrumbs: FC<{ categories: string[] }> = ({
  categories,
}): ReactElement => {
  return (
    <section id="breadcrumbs" className="breadcrumbs">
      {categories?.length > 0 && (
        <span>
          {categories?.map(
            (category, index) =>
              `${category} ${index < categories?.length - 1 ? "> " : ""}`
          )}
        </span>
      )}
    </section>
  );
};

export default Breadcrumbs;

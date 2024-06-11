import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
    name,children
}) {
  return (
    <th onClick={(e)}>
      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {(
          <div>
            <ChevronUpIcon
              className={
                "w-4 "
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 "
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
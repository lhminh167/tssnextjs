import { useEffect, useState } from "react";

export function allowHoc(WrappedComponent, isAllowed: () => boolean) {
  return function (props: any) {
    const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);

    useEffect(() => {
      if (isAllowed()) setShouldDisplay(true);
    }, []);

    return shouldDisplay && <WrappedComponent {...props} />;
  };
}

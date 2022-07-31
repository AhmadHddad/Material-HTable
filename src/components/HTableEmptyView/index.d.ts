import {IHComponents} from "../HTable";

export type HTableEmptyViewProps = {
    emptyViewText: string;
    components: IHComponents;
};

declare const HTableEmptyView: (props: HTableEmptyViewProps) => JSX.Element;

export default HTableEmptyView;

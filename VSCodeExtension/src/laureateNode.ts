import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import { ICategoryDataResult, ILaureateData } from './interface';

export class LaureateNode extends TreeItem {
    constructor(public label: string, public id: string, public children?: LaureateNode[]) {
        super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Expanded);
        this.children = children;
    }

    public static nodeFromCategoryData(parent: string, data: ICategoryDataResult): LaureateNode {
        const parentNode = new LaureateNode(parent, '', []);

        data.laureates.forEach((item: ILaureateData) => {
            parentNode.children?.push(new LaureateNode(item.fullName.en, item.id));
        });

        return parentNode;
    }
}

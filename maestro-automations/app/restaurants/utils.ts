// Styles
import { styles } from "./styles";

export function getListContainerStyle(bottomInset: number) {
  return [styles.listContainer, { paddingBottom: 40 + bottomInset }];
}

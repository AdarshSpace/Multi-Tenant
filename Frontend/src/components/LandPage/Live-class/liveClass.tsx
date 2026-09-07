
import LiveInteractiveClasses from "./LiveClass- variant1"
import {LiveClassesProps} from "./types"



export default function LiveClass({ section }: { section: LiveClassesProps }) {

        return <LiveInteractiveClasses data={section.data} />;
           
  }
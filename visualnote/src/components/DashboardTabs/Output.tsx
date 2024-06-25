import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { resourceInterface } from '../FIleDropZone';

type Props = {
 topic: string;
 image: File[] | null;
 description: string;
 key_concepts: string[];
 explanation: string;
 examples: string[];
 resources: resourceInterface[];
 exercises: string[];
};

function Output(props: Props): JSX.Element {
 const data = {
  topic: props.topic,
  image: props.image,
  description: props.description,
  key_concepts: props.key_concepts,
  explanation: props.explanation,
  examples: props.examples,
  resources: props.resources,
  exercises: props.exercises,
 };

 return (
  <Card className="mb-3">
   <CardHeader>
    <CardTitle>{data.topic}</CardTitle>
    <CardDescription className="flex gap-2 flex-wrap">
     {data.key_concepts.map((concept, index) => (
      <Badge variant="default" key={index} className="bg-gray-500">
       {concept}
      </Badge>
     ))}
    </CardDescription>
   </CardHeader>
   <CardContent className="space-y-4">
    {data.image?.map((image, index) => (
     <img
      key={index}
      src={URL.createObjectURL(image)}
      alt={data.topic}
      className="w-full h-auto"
     />
    ))}
    <div>
     <div className="font-bold text-lg">Description</div>
     <p>{data.description}</p>
    </div>
    <div>
     <div className="font-bold text-lg">Explanation</div>
     <p>{data.explanation}</p>
    </div>
    <div>
     <div className="font-bold text-lg">Examples</div>
     <ul>
      {data.examples.map((example, index) => (
       <li key={index}>-{example}</li>
      ))}
     </ul>
    </div>
    <div>
     <div className="font-bold text-lg">Resources</div>
     <ul>
      {data.resources.map((resource, index) => (
       <li key={index}>
        <a
         href={resource.url}
         target="_blank"
         rel="noopener noreferrer"
         className="text-blue-600"
        >
         {resource.title}
        </a>
       </li>
      ))}
     </ul>
    </div>
    <div>
     <div className="font-bold text-lg">Exercises</div>
     <ul>
      {data.exercises.map((exercise, index) => (
       <li key={index}>-{exercise}</li>
      ))}
     </ul>
    </div>
   </CardContent>
  </Card>
 );
}

export default Output;

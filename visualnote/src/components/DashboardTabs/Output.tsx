import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {};

function Output(props: Props): JSX.Element {
 const data = {
  topic: 'Database Query Languages - Relational Algebra',
  image:
   'https://images.squarespace-cdn.com/content/v1/5aad8b6ff8370a964b27188d/1546290178804-RW3L8695VMFK88ASUPD7/kt2-3.jpg?format=1500w',
  description:
   "The images present a series of database queries formulated in relational algebra. It begins with a schema definition for relations 'Lives', 'Works', 'Located-in', and 'Manages', each describing relationships between 'person-name' and other attributes like 'company-name', 'city', 'salary', 'street', and 'manager-name'. Following this schema, the images delineate seven specific relational algebra queries aimed at extracting data based on certain conditions, primarily focused on the 'Waelhi Company'.",
  key_concepts: [
   'Relational Algebra',
   'Schema Definitions',
   'Basic Selection and Projection in Queries',
   'Joining Relations',
   'Conditions in Queries',
   'Composite Conditions and Nested Queries',
  ],
  explanation:
   "Relational Algebra: This is a procedural query language used to query relational databases. It uses a set of operations that take one or two relations as input and produce a new relation as a result.\n Schema Definitions: The given schemas for 'Lives', 'Works', 'Located-in', and 'Manages' describe the structure of the database. Each schema lists attributes relevant to the entity, for instance, 'Lives' connects 'person-name' with 'street' and 'city'.\n Basic Selection and Projection in Queries: Selection (σ) and Projection (π) are fundamental operations in relational algebra. Selection extracts rows that satisfy a given predicate, while projection extracts specified columns.\n Joining Relations: A join operation combines related tuples from two or more relations into a single tuple, based on a common attribute.\n Conditions in Queries: Adding conditions to queries helps to filter the data according to specific criteria, such as salary, company name, or city.\n Composite Conditions and Nested Queries: Composite conditions combine multiple conditions using logical operators (AND, OR). Nested queries involve a query within another query to achieve more complex data retrieval scenarios.",
  examples: [
   {
    id: 1,
    text:
     "To list all tuples in the 'Works' relation for all persons who work for 'Waelhi Company'",
    query: "σ(company-name='Waelhi Company')(Works)",
   },
   {
    id: 2,

    text:
     "Find names of persons working at 'Waelhi Company' who earn more than Php 50,000",
    query:
     "π(person-name)(σ(company-name='Waelhi Company' ∧ salary > 50000)(Works))",
   },
   {
    id: 3,

    text:
     "Find names and cities of persons who work for 'Waelhi Company' and earn more than Php 50,000",
    query:
     "π(person-name, city)(σ(company-name='Waelhi Company' ∧ salary > 50000)(Works) ⨝ Lives)",
   },
   {
    id: 4,

    text:
     'Find names of all persons who live in the same city as the company they work for',
    query:
     'π(person-name)(σ(Lives.city = Located-in.city ∧ Works.company-name = Located-in.company-name) (Lives ⨝ Works ⨝ Located-in))',
   },
   {
    id: 5,

    text:
     'Find names of all persons who live in the same city and on the same street as their manager',
    query:
     'π(person-name)(σ(Lives.city = Lives.city ∧ Lives.street = Lives.street ∧ Manages.person-name = Lives.person-name)(Manages ⨝ Lives))',
   },
  ],
  resources: [
   {
    url: 'https://en.wikipedia.org/wiki/Relational_algebra',
    title: 'Relational Algebra - Wikipedia',
   },
   {
    url: 'http://db.labthreesixfive.com/schema_relational_algebra.html',
    title: 'Relational Algebra for SQL - Lab365 Database Course',
   },
  ],
  exercises: [
   "List all tuples in the 'Lives' relation for all persons who live in 'Cagayan de Oro city'.",
   'Find the names of persons who work at any company and earn less than Php 30,000.',
   'Identify the name and company of all managers who manage someone and live in the same city as the person they manage.',
   "Extract names of persons who work for 'Waelhi Company' but do not live in 'Cagayan de Oro city'.",
   'Determine the names of persons who manage themselves (i.e., their person-name is the same as their manager-name).',
  ],
 };

 return (
  <Card>
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
    <img src={data.image} alt={data.topic} className="w-full h-auto" />
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
       <li key={index}>
        <div className="font-bold">
         {example.id}. {example.text}
        </div>
        <p>{example.query}</p>
       </li>
      ))}
     </ul>
    </div>
    <div>
     <div className="font-bold text-lg">Resources</div>
     <ul>
      {data.resources.map((resource, index) => (
       <li key={index}>
        <a href={resource.url} target="_blank" rel="noopener noreferrer">
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

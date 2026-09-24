import {compile} from '@mdx-js/mdx';
import matter from 'gray-matter';
import {validateTranslation} from '../core/validate.ts';
import {parseQuiz} from '../quiz-parser.ts';
import {protectedDiff} from './protocol.ts';
export async function validateNegotiatedTranslation(source:string,target:string,baseline:string,path:string,locale:'es'|'ja'){
 const structural=validateTranslation({sourceContents:source,targetContents:target,targetPath:path,locale});
 let mdxError:string|null=null;try{await compile(matter(target).content);}catch(error){mdxError=String(error);}
 const protectedChanges=protectedDiff(baseline,target,source);
 let quizError:string|null=null;
 if(source.includes('<Challenge'))try{
  const signature=(text:string)=>parseQuiz(matter(text).content).challenges.map(c=>({index:c.index,answers:c.options.map(o=>!!o.isAnswer),clientVisible:c.clientVisible}));
  if(JSON.stringify(signature(source))!==JSON.stringify(signature(target)))throw Error('Quiz answer positions/index/hydration changed');
 }catch(error){quizError=String(error);}
 return {structural,mdxError,protectedChanges,quizError,passed:structural.passed&&!mdxError&&!protectedChanges.length&&!quizError};
}

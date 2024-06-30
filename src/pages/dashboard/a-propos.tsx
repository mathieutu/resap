import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { SimpleHeader } from "../../components/Layout/SimpleHeader";
import { Container } from "../../components/Layout/Container";
import { isPreviewForced, fetchAPropos } from "../../services/contentful";

interface AProposProps {
  preview: boolean;
  content: string | null;
  id: string;
}

function parseHtmlToFormattedText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  function extractText(node: Node, listIndex: number[] = []): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      let text = '';
      
      if (element.tagName.toLowerCase() === 'ol') {
        listIndex.push(0);
      }
      
      for (const child of Array.from(element.childNodes)) {
        text += extractText(child, listIndex);
      }
      
      if (element.tagName.toLowerCase() === 'ol') {
        listIndex.pop();
      }
      
      switch (element.tagName.toLowerCase()) {
        case 'h1':
        case 'h2':
        case 'h3':
          return '\n\n' + text.toUpperCase() + '\n\n';
        case 'p':
          return text + '\n\n';
        case 'br':
          return '\n';
        case 'li':
          if (element.parentElement?.tagName.toLowerCase() === 'ol') {
            listIndex[listIndex.length - 1]++;
            return `${listIndex[listIndex.length - 1]}. ${text}\n`;
          }
          return '• ' + text + '\n';
        default:
          return text;
      }
    }
    
    return '';
  }
  
  return extractText(doc.body).replace(/\n{3,}/g, '\n\n').trim();
}

export default function APropos({ content }: AProposProps) {
  const [textareaContent, setTextareaContent] = useState("");

  useEffect(() => {
    if (content) {
      setTextareaContent(parseHtmlToFormattedText(content));
    }
  }, [content]);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaContent(event.target.value);
  };

  return (
    <Layout className="bg-gray-light">
      <SimpleHeader 
        className="h-[300px]" 
        title="À propos" 
        titleClassName="text-blue-default" 
        subTitle="" 
        children={undefined}
      />
      <Container className="-mt-24 pb-12">
        <textarea
          value={textareaContent}
          onChange={handleTextareaChange}
          className="w-full h-[500px] p-4 border border-gray-300 rounded font-sans text-base whitespace-pre-wrap"
        />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AProposProps> = async ({ preview }) => {
  const content = await fetchAPropos();
  
  return {
    props: {
      preview: preview || isPreviewForced,
      content: content as string | null,
      id: 'a-propos',
    },
    revalidate: 60,
  };
};
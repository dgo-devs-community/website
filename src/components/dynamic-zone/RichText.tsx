import React, { JSX } from 'react';

interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  linkType?: string;
  url?: string;
  newTab?: boolean;
}

interface Block {
  type: string;
  children?: (TextNode | Block)[];
  level?: number;
  format?: string;
  url?: string;
  newTab?: boolean;
  language?: string;
  code?: string;
  [key: string]: unknown;
}

interface RichTextProps {
  content: Block | Block[];
  className?: string;
}

function RichText({ content, className = '' }: RichTextProps) {
  const blocks = Array.isArray(content) ? content : [content];

  if (!blocks.length) {
    console.warn('RichText: No content provided');
    return null;
  }

  const renderText = (node: TextNode, index: number) => {
    if (!node.text) return null;
    
    let element: React.ReactNode = node.text;
    
    // Apply styles in a specific order
    if (node.bold) element = <strong>{element}</strong>;
    if (node.italic) element = <em>{element}</em>;
    if (node.underline) element = <u>{element}</u>;
    if (node.strikethrough) element = <s>{element}</s>;
    if (node.code) element = <code className="bg-gray-100 px-1 rounded font-mono text-sm">{element}</code>;
    
    // Handle links
    if (node.linkType === 'custom' && node.url) {
      element = (
        <a 
          href={node.url} 
          target={node.newTab ? "_blank" : "_self"} 
          rel={node.newTab ? "noopener noreferrer" : undefined}
        >
          {element}
        </a>
      );
    }
    
    return <React.Fragment key={index}>{element}</React.Fragment>;
  };

  const renderNode = (node: TextNode | Block, index: number): React.ReactNode => {
    // Handle text nodes
    if (node.type === 'text') {
      return renderText(node as TextNode, index);
    }

    const block = node as Block;
    const children = block.children?.map((child, i) => renderNode(child, i)) || [];

    switch (block.type) {
      case 'heading':
        const level = Math.min(6, Math.max(1, block.level || 2));
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return React.createElement(
          HeadingTag, 
          { 
            key: index
          }, 
          ...children
        );

      case 'paragraph':
        return <p key={index}>{children}</p>;

      case 'blockquote':
        return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>;

      case 'code':
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className={`language-${block.language || 'text'}`}>
              {block.code || children}
            </code>
          </pre>
        );

      case 'link':
        return (
          <a 
            key={index}
            href={block.url}
            target={block.newTab ? "_blank" : "_self"}
            rel={block.newTab ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );

      case 'list':
        const isOrdered = block.format === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        return React.createElement(
          ListTag,
          {
            key: index
          },
          ...children
        );

      case 'list-item':
        return <li key={index}>{children}</li>;

      // Add more block types as needed
      default:
        console.warn(`Unhandled block type: ${block.type}`, block);
        return <div key={index}>{children}</div>;
    }
  };

  return (
    <div className={`prose max-w-none ${className}`}>
      {blocks.map((block, index) => renderNode(block, index))}
    </div>
  );
}

export default React.memo(RichText);

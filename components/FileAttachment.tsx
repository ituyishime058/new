
import React from 'react';
// FIX: Add file extension to import.
import { Message } from '../types.ts';
import Icon from './Icon';

interface FileAttachmentProps {
  attachment: NonNullable<Message['attachment']>;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ attachment }) => {
  return (
    <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-3 my-1">
      <div className="bg-white/20 p-2 rounded-full">
        <Icon name="Document" className="w-6 h-6" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-bold truncate">{attachment.fileName}</p>
        <p className="text-xs opacity-80">{attachment.fileSize}</p>
      </div>
      <a href={attachment.url} download={attachment.fileName} className="p-2 rounded-full hover:bg-white/20">
        <Icon name="ArrowDownTray" className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FileAttachment;
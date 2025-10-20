
import React, { useState, useRef, useCallback } from 'react';
import type { Post, Poll, PollOption } from '../types';
import { currentUser } from '../constants';
import { FileType } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';
import { generatePostContent } from '../services/geminiService';
import AiImageEditor from './AiImageEditor';

interface CreatePostProps {
  onAddPost: (newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType | null>(null);
  
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiEditorOpen, setIsAiEditorOpen] = useState(false);
  
  const [poll, setPoll] = useState<Omit<Poll, 'options'> & { options: { text: string }[] }>({ question: '', options: [{ text: '' }, { text: '' }] });
  const [isPollPanelOpen, setIsPollPanelOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        if (selectedFile.type.startsWith('image/')) {
            setFileType(FileType.IMAGE);
        } else if (selectedFile.type.startsWith('video/')) {
            setFileType(FileType.VIDEO);
        } else {
            setFileType(FileType.OTHER);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setFileType(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const resetState = () => {
    setContent('');
    removeFile();
    setIsAiPanelOpen(false);
    setAiPrompt('');
    setIsPollPanelOpen(false);
    setPoll({ question: '', options: [{ text: '' }, { text: '' }] });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim() && !file && !isPollPanelOpen) return;

    const newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'> = { content };
    if (file && previewUrl) {
      if(fileType === FileType.IMAGE) newPost.imageUrl = previewUrl;
      else if (fileType === FileType.VIDEO) newPost.videoUrl = previewUrl;
      else newPost.file = { name: file.name, url: previewUrl, type: file.type };
    }
    
    if (isPollPanelOpen && poll.question.trim() && poll.options.every(o => o.text.trim())) {
        newPost.poll = {
            question: poll.question,
            options: poll.options.map((opt, i) => ({
                id: `opt-${i+1}`,
                text: opt.text,
                votes: 0,
            }))
        }
    }
    
    onAddPost(newPost);
    resetState();
  };

  const handleGenerateWithAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const generatedContent = await generatePostContent(aiPrompt);
      setContent(generatedContent);
      setIsAiPanelOpen(false);
      setAiPrompt('');
    } catch(e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePollQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoll({ ...poll, question: e.target.value });
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...poll.options];
    newOptions[index].text = value;
    setPoll({ ...poll, options: newOptions });
  };

  const addPollOption = () => {
    if (poll.options.length < 4) {
      setPoll({ ...poll, options: [...poll.options, { text: '' }] });
    }
  };
  
  const handleImageEdited = (newImageUrl: string) => {
      setPreviewUrl(newImageUrl);
      // Here you might want to convert the base64 URL back to a File object
      // but for simplicity, we'll proceed with the base64 string.
      setFile(null); 
  }

  const fileInputAccept = "image/*,video/mp4,video/quicktime,video/webm";

  return (
    <>
    <div className="bg-primary p-4 rounded-xl shadow-md mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
          <div className="w-full">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-transparent text-lg placeholder-text-secondary focus:outline-none resize-none"
              rows={3}
              disabled={isGenerating}
            />
            {previewUrl && (
              <div className="mt-4 relative group">
                {fileType === FileType.IMAGE && (
                  <>
                    <img src={previewUrl} alt="Preview" className="rounded-lg max-h-80 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setIsAiEditorOpen(true)} className="flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/30">
                           <Icon name="Sparkles" className="w-5 h-5"/>
                           <span>Edit with AI</span>
                        </button>
                    </div>
                  </>
                )}
                {fileType === FileType.VIDEO && ( <video src={previewUrl} className="rounded-lg max-h-80 w-full bg-black" controls /> )}
                {fileType === FileType.OTHER && (
                  <div className="flex items-center p-3 bg-secondary rounded-lg border border-border-color">
                    <Icon name="Document" className="w-8 h-8 text-accent" />
                    <span className="ml-3 text-sm truncate text-text-secondary">{file?.name}</span>
                  </div>
                )}
                <button type="button" onClick={removeFile} className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-colors">
                  <Icon name="XMark" className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {isAiPanelOpen && (
           <div className="mt-4 ml-14 p-3 bg-secondary rounded-lg border border-border-color animate-fade-in">
              <div className="flex items-center space-x-2">
                <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Describe the post you want to generate..." className="w-full bg-transparent placeholder-text-secondary focus:outline-none text-sm" disabled={isGenerating}/>
                <button type="button" onClick={handleGenerateWithAi} disabled={isGenerating || !aiPrompt.trim()} className="bg-gradient-to-r from-accent-start to-accent-end text-white px-3 py-1 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
           </div>
        )}
        
        {isPollPanelOpen && (
            <div className="mt-4 ml-14 p-3 bg-secondary rounded-lg border border-border-color space-y-3 animate-fade-in">
                <input type="text" value={poll.question} onChange={handlePollQuestionChange} placeholder="Poll Question" className="w-full bg-background p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                {poll.options.map((option, index) => (
                    <input key={index} type="text" value={option.text} onChange={(e) => handlePollOptionChange(index, e.target.value)} placeholder={`Option ${index + 1}`} className="w-full bg-background p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"/>
                ))}
                {poll.options.length < 4 && <button type="button" onClick={addPollOption} className="text-sm text-accent font-semibold">Add Option</button>}
            </div>
        )}

        <div className="flex justify-between items-center mt-4 ml-14">
          <div className="flex space-x-2 text-text-secondary">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-secondary transition-colors"><Icon name="Photo" className="w-6 h-6" /></button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={fileInputAccept} className="hidden" />
            <button type="button" onClick={() => {setIsPollPanelOpen(!isPollPanelOpen); if (!isPollPanelOpen) setIsAiPanelOpen(false);}} className={`p-2 rounded-full transition-colors ${isPollPanelOpen ? 'text-accent bg-indigo-100 dark:bg-purple-900/50' : 'hover:bg-secondary'}`}><Icon name="ClipboardDocumentList" className="w-6 h-6" /></button>
            <button type="button" onClick={() => {setIsAiPanelOpen(!isAiPanelOpen); if (!isAiPanelOpen) setIsPollPanelOpen(false);}} className={`p-2 rounded-full transition-colors ${isAiPanelOpen ? 'text-accent bg-indigo-100 dark:bg-purple-900/50' : 'hover:bg-secondary'}`}><Icon name="Sparkles" className="w-6 h-6" /></button>
          </div>
          <button type="submit" disabled={(!content.trim() && !file && !poll.question.trim()) || isGenerating} className="bg-gradient-to-r from-accent-start to-accent-end text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            Post
          </button>
        </div>
      </form>
    </div>
    {previewUrl && fileType === FileType.IMAGE && file && (
        <AiImageEditor 
            isOpen={isAiEditorOpen} 
            onClose={() => setIsAiEditorOpen(false)}
            imageFile={file}
            onImageEdited={handleImageEdited}
        />
    )}
    </>
  );
};

export default CreatePost;

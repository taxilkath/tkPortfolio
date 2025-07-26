    import { Button } from '@taxilkath/ui'
    import { Download, FileText, Calendar, MapPin } from 'lucide-react'
    import { useState } from 'react'
    import WordViewer from '../word-viewer'

    const CVCard = () => {
        const [isWordViewerOpen, setIsWordViewerOpen] = useState(false)

        // CV Word document URL pointing to the actual file in public directory
        const cvWordUrl = 'videos/Taxil_CV_fullstack.docx'

        const handleDownload = () => {
            // Create download link
            const link = document.createElement('a')
            link.href = cvWordUrl
            link.download = 'videos/Taxil_CV_fullstack.docx'
            link.click()
        }

        const handleView = () => {
            setIsWordViewerOpen(true)
        }

        return (
            <div className='group shadow-feature-card flex flex-col gap-6 rounded-xl p-4 lg:p-6 transition-all duration-500 border border-transparent hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer overflow-hidden'>
                <div className='flex items-center gap-2'>
                    <FileText className='size-[20px]' />
                    <h2 className='text-sm'>Resume</h2>
                </div>

                {/* Initial State - Enhanced Content */}
                <div className='flex flex-col items-center gap-4 relative'>
                    <div className='flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-all duration-500 group-hover:scale-75 group-hover:opacity-0'>
                        <Download className='size-7 transition-all duration-500 group-hover:size-5' />
                    </div>

                    {/* Initial State Content */}
                    <div className='flex flex-col items-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2'>
                        <h3 className='text-sm font-medium text-foreground'>Full-Stack Developer</h3>
                        <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                            <span className='flex items-center gap-1'>
                                <div className='w-2 h-2 rounded-full bg-green-500'></div>
                                Available
                            </span>
                            <span>•</span>
                            <span>2024 Updated</span>
                        </div>
                    </div>

                    {/* Hover State - Revealed Content */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 pt-7'>

                        {/* Quick Stats */}
                        <div className='flex items-center gap-4 text-xs text-muted-foreground mb-2'>
                            <div className='flex items-center gap-1'>
                                <Calendar className='size-3' />
                                <span>2024</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <MapPin className='size-3' />
                                <span>UK</span>
                            </div>
                        </div>

                        {/* Short Summary */}
                        <p className='text-xs text-center text-muted-foreground px-2 leading-relaxed'>
                            Full-Stack Developer
                            <br />
                            Specializing in React & Node.js
                        </p>

                        {/* Action Buttons */}
                        <div className='flex gap-2 w-full mt-2'>
                            <Button
                                onClick={handleDownload}
                                variant='outline'
                                size='sm'
                                className='flex-1 rounded-lg hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-950/50 transition-colors text-xs py-2'
                            >
                                <Download className='size-3 mr-1' />
                                Download
                            </Button>
                            <Button
                                onClick={handleView}
                                variant='outline'
                                size='sm'
                                className='flex-1 rounded-lg hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-950/50 transition-colors text-xs py-2'
                            >
                                <FileText className='size-3 mr-1' />
                                View
                            </Button>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer */}
                <WordViewer
                    isOpen={isWordViewerOpen}
                    onClose={() => setIsWordViewerOpen(false)}
                    wordUrl={cvWordUrl}
                    title="Resume"
                />
            </div>
        )
    }

    export default CVCard 

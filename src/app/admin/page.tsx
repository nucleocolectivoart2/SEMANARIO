
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, LogOut, Edit3, Trash2, 
  Eye, EyeOff, Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  useFirestore, setDocumentNonBlocking, deleteDocumentNonBlocking, 
  updateDocumentNonBlocking, useCollection, useMemoFirebase, useAuth, useUser 
} from '@/firebase';
import { collection, serverTimestamp, doc, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/Logo';

const ALLOWED_ADMINS = [
  'nucle.colectivo.art@gmail.com',
  'mvalvarezg@hotmail.com'
];

const GITHUB_BASE = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/archivo";
const PORTADA_BASE = `${GITHUB_BASE}/portadas`;

export const officialArchiveItems = [
  {
    id: 'sh-01',
    title: 'EDICIÓN No. 1: EL NACIMIENTO',
    year: '1990',
    description: 'Presentación del semanario. Programación de Cine Buho en el Teatro Junín con Rain Man y Fanny y Alexander. Teatro de Muñecos La Fanfarria presenta Cuartico Azul.',
    imageUrl: `${PORTADA_BASE}/sem1%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem1%20(1).pdf`,
    category: 'Fundacional'
  },
  {
    id: 'sh-02',
    title: 'EDICIÓN No. 2: CINE Y SINFÓNICA',
    year: '1990',
    description: 'Aniversario de la Orquesta Sinfónica de Antioquia en el Teatro Metropolitano. Programación de El matrimonio de María Braun y la obra Pareja Abierta en la Casa del Teatro.',
    imageUrl: `${PORTADA_BASE}/sem2%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem2%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-03',
    title: 'EDICIÓN No. 3: CANTO GREGORIANO',
    year: '1990',
    description: 'Concierto de Canto Gregoriano por el conjunto francés Organum en San Ignacio. El Teatro Matacandelas presenta La zapatera prodigiosa de García Lorca.',
    imageUrl: `${PORTADA_BASE}/sem3%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem3%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-04',
    title: 'EDICIÓN No. 4: REGISTRO SEMANAL',
    year: '1990',
    description: 'Boletín cultural semanal con el calendario de eventos para la cuarta semana de circulación. Incluye secciones de cine, teatro y música en el Centro.',
    imageUrl: `${PORTADA_BASE}/sem4%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem4%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-05',
    title: 'EDICIÓN No. 5: AGENDA CULTURAL',
    year: '1990',
    description: 'Calendario completo de actividades artísticas en universidades, bibliotecas y centros culturales de la Comuna 10.',
    imageUrl: `${PORTADA_BASE}/sem5%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem5%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-27',
    title: 'EDICIÓN No. 27: LA MANCHA Y GABO',
    year: '1990',
    description: 'Inauguración del Teatro Experimental La Mancha con el estreno de "Album". Ciclo de cine basado en Gabriel García Márquez: Cartas del Parque y Milagro en Roma.',
    imageUrl: `${PORTADA_BASE}/sem%2027%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2027%20(1).pdf`,
    category: 'Hito'
  },
  {
    id: 'sh-32',
    title: 'EDICIÓN No. 32: ANIVERSARIO TEATRAL',
    year: '1990',
    description: 'Celebración de 5 años del Teatro Universidad de Medellín con el Festival del Recuerdo. Exposición de 100 años de Fotografía de Modas en el Museo de Antioquia.',
    imageUrl: `${PORTADA_BASE}/sem%2032%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2032%20(1).pdf`,
    category: 'Especial'
  },
  {
    id: 'sh-38',
    title: 'EDICIÓN No. 38: ARTES VISUALES',
    year: '1990',
    description: 'Retrospectiva póstuma de Humberto Castaño "Mataco". XXI Salón de Artes Visuales en el Museo de Antioquia y ciclo de Rainer Fassbinder en la Cinemateca.',
    imageUrl: `${PORTADA_BASE}/sem%2038%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2038%20(1).pdf`,
    category: 'Hito'
  },
  {
    id: 'sh-40',
    title: 'EDICIÓN No. 40: LITERATURA HOY',
    year: '1990',
    description: 'Presentaciones de libros de Juan Manuel Roca y Darío Ruiz Gómez en la Piloto. Estreno de "Sexo, mentiras y video" y ciclo de cine japonés en el Colombo.',
    imageUrl: `${PORTADA_BASE}/sem%2040%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2040%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-59',
    title: 'EDICIÓN No. 59: CINE DE AUTOR',
    year: '1991',
    description: 'Ciclos de Ingmar Bergman, Antonioni y Bertolucci. El Teatro Matacandelas presenta "O Marinheiro" de Fernando Pessoa y el Pequeño Teatro "El Fin del Comienzo".',
    imageUrl: `${PORTADA_BASE}/sem%2059%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2059%20(1).pdf`,
    category: 'Registro'
  }
];

export default function AdminCMS() {
  const db = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'cultural_agenda_entry',
    category: '',
    url: '',
    startDate: '',
    locationName: '',
    imageUrl: '',
    year: '',
  });

  const normalizedAllowedAdmins = useMemo(() => ALLOWED_ADMINS.map(a => a.toLowerCase()), []);
  const isAllowed = user && normalizedAllowedAdmins.includes(user.email?.toLowerCase() || '');

  useEffect(() => {
    if (user && isAllowed) {
      setDocumentNonBlocking(
        doc(db, 'admin_users', user.uid),
        { id: user.uid, email: user.email, role: 'admin', lastLogin: serverTimestamp() },
        { merge: true }
      );
    }
  }, [user, isAllowed, db]);

  const { data: firestoreArchive } = useCollection(useMemoFirebase(() => query(collection(db, 'archive_items'), orderBy('year', 'desc')), [db]));

  const displayArchive = useMemo(() => {
    const fromFirestore = (firestoreArchive || []).map(item => ({ ...item, isOfficial: false }));
    const firestoreTitles = new Set(fromFirestore.map(f => f.title.toUpperCase()));
    const finalOfficial = officialArchiveItems
      .filter(oa => !firestoreTitles.has(oa.title.toUpperCase()))
      .map(oa => ({
        ...oa,
        isOfficial: true
      }));
    return [...fromFirestore, ...finalOfficial];
  }, [firestoreArchive]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = email.trim().toLowerCase();
    if (!normalizedAllowedAdmins.includes(targetEmail)) {
      toast({ title: "Acceso Denegado", description: "Correo no autorizado.", variant: "destructive" });
      return;
    }
    setIsAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, targetEmail, password);
    } catch (error: any) {
      toast({ title: "Error", description: "Credenciales inválidas.", variant: "destructive" });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const startEditing = (item: any, type: string) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      contentType: type === 'cultural_events' ? 'cultural_agenda_entry' : 
                   type === 'multimedia_content' ? 'multimedia_content' : 'archive_item',
      category: item.category || '',
      url: item.url || item.sourceUrl || item.pdfUrl || '',
      startDate: item.startDate || '',
      locationName: item.locationName || '',
      imageUrl: item.imageUrl || item.thumbnailUrl || '',
      year: item.year || '',
    });
    setActiveTab('create');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({ 
      title: '', description: '', contentType: 'cultural_agenda_entry', 
      category: '', url: '', startDate: '',
      locationName: '', imageUrl: '', year: ''
    });
  };

  const handlePublish = async () => {
    if (!formData.title) return;
    setPublishing(true);
    const id = editingId && !editingId.startsWith('sh-') ? editingId : Math.random().toString(36).substr(2, 9);
    let target = formData.contentType === 'cultural_agenda_entry' ? 'cultural_events' : 
                 formData.contentType === 'multimedia_content' ? 'multimedia_content' : 'archive_items';
    
    const payload = { ...formData, id, publicationDate: new Date().toISOString() };
    if (editingId && !editingId.startsWith('sh-')) {
      updateDocumentNonBlocking(doc(db, target, id), payload);
    } else {
      setDocumentNonBlocking(doc(db, target, id), payload, { merge: true });
    }
    
    toast({ title: "Publicado" });
    cancelEditing();
    setPublishing(false);
  };

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!user || !isAllowed) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white rounded-none border-none shadow-2xl">
          <CardHeader className="text-center p-10">
            <div className="w-20 h-20 bg-brand-gold flex items-center justify-center mx-auto mb-8 shadow-xl p-4">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tighter">Panel Editorial HOY</CardTitle>
          </CardHeader>
          <CardContent className="p-10 pt-0">
            <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Credenciales de Acceso</Label>
                <Input placeholder="CORREO ELECTRÓNICO" className="rounded-none h-12 font-black uppercase text-[11px] tracking-widest" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="relative space-y-2">
                <Input type={showPassword ? "text" : "password"} placeholder="CONTRASEÑA" className="rounded-none h-12 pr-12 font-black uppercase text-[11px] tracking-widest" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 translate-y-1 text-muted-foreground hover:text-brand-black transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" disabled={isAuthLoading} className="w-full bg-brand-black hover:bg-brand-gold text-white rounded-none h-14 uppercase font-black tracking-[0.3em] text-[11px] transition-all">
                {isAuthLoading ? <Loader2 className="animate-spin" /> : "INGRESAR AL CMS"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="pt-32 container mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-4">
            <span className="inline-block bg-brand-gold text-brand-black px-4 py-1 text-[9px] font-black uppercase tracking-[0.4em]">SISTEMA DE GESTIÓN DE CONTENIDOS</span>
            <h1 className="text-6xl md:text-8xl font-black text-brand-black tracking-tighter uppercase leading-[0.8]">CMS <br /> <span className="text-brand-gold">HOY</span></h1>
          </div>
          <Button onClick={() => signOut(auth)} variant="outline" className="rounded-none border-brand-black hover:bg-brand-black hover:text-white uppercase font-black text-[10px] tracking-widest h-12 px-8">
            <LogOut size={16} className="mr-3" /> SALIR DEL PANEL
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
          <TabsList className="bg-white border-2 border-brand-black h-auto p-1 rounded-none w-full justify-start overflow-x-auto shadow-lg">
            <TabsTrigger value="create" className="rounded-none px-10 py-4 data-[state=active]:bg-brand-black data-[state=active]:text-white font-black uppercase text-[11px] tracking-widest">CREAR NUEVO</TabsTrigger>
            <TabsTrigger value="archivo" className="rounded-none px-10 py-4 data-[state=active]:bg-brand-black data-[state=active]:text-white font-black uppercase text-[11px] tracking-widest">GESTIONAR ARCHIVO</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card className="border-none rounded-none shadow-2xl bg-white">
              <CardHeader className="p-10 border-b-4 border-brand-black">
                 <CardTitle className="uppercase font-black text-2xl tracking-tighter">{editingId ? 'EDITAR REGISTRO' : 'PUBLICAR CONTENIDO'}</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Tipo de Contenido</Label>
                    <Select value={formData.contentType} onValueChange={(v) => setFormData({...formData, contentType: v})}>
                      <SelectTrigger className="rounded-none h-12 font-black uppercase text-[11px] border-2"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-none border-2 border-brand-black">
                        <SelectItem value="cultural_agenda_entry" className="font-black uppercase text-[10px]">EVENTO CULTURAL</SelectItem>
                        <SelectItem value="multimedia_content" className="font-black uppercase text-[10px]">VIDEO / REDES</SelectItem>
                        <SelectItem value="archive_item" className="font-black uppercase text-[10px]">ARCHIVO HISTÓRICO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Categoría / Temporada</Label>
                    <Input className="rounded-none h-12 border-2 font-medium" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Título Principal</Label>
                  <Input className="rounded-none h-12 border-2 font-black uppercase text-sm tracking-tight" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Descripción Editorial</Label>
                  <Textarea className="rounded-none border-2 min-h-[120px] font-medium" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest">URL Imagen / Portada</Label>
                      <Input className="rounded-none h-12 border-2" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
                   </div>
                   <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest">URL Video / Archivo PDF</Label>
                      <Input className="rounded-none h-12 border-2" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
                   </div>
                </div>
                {formData.contentType === 'archive_item' && (
                  <div className="space-y-3 p-6 bg-muted/30 border-l-8 border-brand-purple">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Año de Publicación</Label>
                    <Input className="rounded-none h-12 border-2 font-black" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
                  </div>
                )}
                <div className="flex gap-4 pt-6">
                  <Button onClick={handlePublish} disabled={publishing} className="flex-1 bg-brand-gold hover:bg-brand-black text-brand-black hover:text-white rounded-none h-16 font-black uppercase tracking-[0.4em] text-[11px] transition-all">
                    {publishing ? <Loader2 className="animate-spin" /> : editingId ? "ACTUALIZAR DATOS" : "PUBLICAR EN VIVO"}
                  </Button>
                  {editingId && <Button onClick={cancelEditing} variant="outline" className="rounded-none h-16 px-10 font-black uppercase text-[10px] tracking-widest border-2 border-brand-black">CANCELAR</Button>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archivo">
             <Card className="border-none rounded-none shadow-2xl p-0 bg-white">
               <ScrollArea className="h-[700px]">
                 {displayArchive && displayArchive.length > 0 ? (
                   displayArchive.map(item => (
                    <div key={item.id} className="p-8 border-b-2 last:border-0 flex justify-between items-center group hover:bg-muted/5 transition-all">
                      <div className="flex items-center gap-8">
                         <div className="w-16 h-20 bg-muted overflow-hidden border-2 border-brand-purple">
                            <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div>
                           <h4 className="font-black uppercase text-xl tracking-tighter">{item.title}</h4>
                           <div className="flex gap-4 mt-2">
                              <span className="text-[10px] text-brand-purple font-black uppercase tracking-[0.3em]">EDICIÓN AÑO {item.year}</span>
                              {item.isOfficial && <span className="text-[8px] bg-brand-black text-white px-2 py-0.5 font-black uppercase tracking-widest">REGISTRO BASE</span>}
                           </div>
                         </div>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={() => startEditing(item, 'archive_items')} variant="ghost" size="icon" className="hover:bg-brand-teal hover:text-white"><Edit3 size={20} /></Button>
                        {!item.isOfficial && (
                          <Button onClick={() => deleteDocumentNonBlocking(doc(db, 'archive_items', item.id))} variant="ghost" size="icon" className="text-brand-red hover:bg-brand-red hover:text-white"><Trash2 size={20} /></Button>
                        )}
                      </div>
                    </div>
                  ))
                 ) : (
                   <div className="p-20 text-center flex flex-col items-center gap-4">
                      <Info className="text-muted-foreground opacity-20" size={48} />
                      <p className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">No se han registrado piezas de archivo histórico.</p>
                   </div>
                 )}
               </ScrollArea>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

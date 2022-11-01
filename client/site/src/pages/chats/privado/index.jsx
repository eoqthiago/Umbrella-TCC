import React, { useEffect, useRef, useState } from 'react';
import Header from '../../../components/header';
import Menu from '../../../components/menu';
import InputMensagem from '../../../components/input-mensagem';
import { useParams, useNavigate } from 'react-router-dom';
import localStorage from 'local-storage';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { socketUrl } from '../../../api/services';
import MensagemComp from '../../../components/message';
import './index.sass';

const socket = io.connect(socketUrl);

const Index = () => {
};

export default Index;
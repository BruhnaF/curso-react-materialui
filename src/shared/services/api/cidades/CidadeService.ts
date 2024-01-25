import { Environment } from '../../../environment';
import { Api } from '../../axios-config';


export interface IListagemCidade {
  id: string;
  nome: string;
}

export interface IDetalheCidade {
  id: string;
  nome: string;
}

export type TCidadeComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadeComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome=${filter}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(data.length || Environment.LIMITE_DE_LINHAS)
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: string): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

    if (data) {
      console.log(data);
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: string, dados: IDetalheCidade): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const CidadeService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};